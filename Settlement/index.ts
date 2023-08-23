import { isoly } from "isoly"
import { isly } from "isly"
import { Entry as SettlementEntry } from "./Entry"

export type Settlement = Settlement.Succeeded | Settlement.Failed | Settlement.Ongoing
export namespace Settlement {
	export type Summary = Omit<Settlement.Succeeded, "entries"> | Settlement.Failed | Omit<Settlement.Ongoing, "entries">
	export interface Base {
		id: string
		created: [string, isoly.DateTime]
		regarding: isoly.Date
		configuration: string
		status: string
	}
	export interface Succeeded extends Base {
		status: "succeeded"
		amount: Partial<Record<isoly.Currency, number>>
		fee: Partial<Record<isoly.Currency, number>>
		entries: SettlementEntry[]
		settled: { user: string; created: isoly.DateTime; transactions: Record<string, [isoly.Currency, number]> }
	}
	export interface Failed extends Base {
		status: "failed"
		reason: string
	}
	export interface Ongoing extends Base {
		status: "ongoing"
		amount: Partial<Record<isoly.Currency, number>>
		fee: Partial<Record<isoly.Currency, number>>
		entries: SettlementEntry[]
	}

	export namespace Succeeded {
		export const type = isly.object<Succeeded>({
			id: isly.string(),
			created: isly.tuple(isly.string(), isly.fromIs("Settlement.created", isoly.DateTime.is)),
			regarding: isly.fromIs("Settlement.regarding", isoly.Date.is),
			configuration: isly.string(),
			settled: isly.object<{
				user: string
				created: isoly.DateTime
				transactions: Record<string, [isoly.Currency, number]>
			}>({
				user: isly.string(),
				created: isly.fromIs("Settlement.settled.created", isoly.DateTime.is),
				transactions: isly.record(
					isly.string(),
					isly.tuple(isly.fromIs("Settlement.settled.transactions.currency", isoly.Currency.is), isly.number())
				),
			}),
			amount: isly.record(isly.fromIs("Settlement.entries.amount", isoly.Currency.is), isly.number()),
			fee: isly.record(isly.fromIs("Settlement.entries.fee", isoly.Currency.is), isly.number()),
			entries: SettlementEntry.type.array(),
			status: isly.string("succeeded"),
		})
		export const is = type.is
	}
	export namespace Failed {
		export const type = isly.object<Failed>({
			id: isly.string(),
			created: isly.tuple(isly.string(), isly.fromIs("Settlement.created", isoly.DateTime.is)),
			regarding: isly.fromIs("Settlement.regarding", isoly.Date.is),
			configuration: isly.string(),
			status: isly.string("failed"),
			reason: isly.string(),
		})
		export const is = type.is
	}
	export namespace Ongoing {
		export const type = isly.object<Ongoing>({
			id: isly.string(),
			created: isly.tuple(isly.string(), isly.fromIs("Settlement.created", isoly.DateTime.is)),
			regarding: isly.fromIs("Settlement.regarding", isoly.Date.is),
			configuration: isly.string(),
			amount: isly.record(isly.fromIs("Settlement.entries.amount", isoly.Currency.is), isly.number()),
			fee: isly.record(isly.fromIs("Settlement.entries.fee", isoly.Currency.is), isly.number()),
			entries: SettlementEntry.type.array(),
			status: isly.string("ongoing"),
		})
		export const is = type.is
	}
	export const type = isly.union<Settlement, Succeeded, Failed, Ongoing>(Succeeded.type, Failed.type, Ongoing.type)
	export const is = type.is
	export const flaw = type.flaw
	export const Entry = SettlementEntry
	export type Entry = SettlementEntry
}
