import { gracely } from "gracely"
import { isoly } from "isoly"
import { isly } from "isly"
import { Transaction } from "../Transaction"

export type Settlement = Succeeded | Failed

export interface Base {
	id: string
	created: [string, isoly.DateTime]
	configuration: string
	status: string
}

export interface Failed extends Base {
	status: "failed"
}

export interface Succeeded extends Base {
	settled?: { user: string; created: isoly.DateTime; transaction: string }
	amount: Record<isoly.Currency, number>
	fee: Record<isoly.Currency, number>
	entries: {
		status: "succeeded" | "failed"
		type: "capture" | "cancel" | "refund"
		account: string
		card: string
		transaction: string
		amount: [isoly.Currency, number]
		fee: [isoly.Currency, number]
	}[]
	status: "succeeded"
}

export namespace Settlement {
	export const type = isly.union<Settlement, Succeeded, Failed>(
		isly.object<Succeeded>({
			id: isly.string(),
			created: isly.tuple(isly.string(), isly.fromIs("Settlement.created", isoly.DateTime.is)),
			configuration: isly.string(),
			settled: isly
				.object<{ user: string; created: isoly.DateTime; transaction: string }>({
					user: isly.string(),
					created: isly.fromIs("Settlement.settled.created", isoly.DateTime.is),
					transaction: isly.string(),
				})
				.optional(),
			amount: isly.record(isly.fromIs("Settlement.entries.amount", isoly.Currency.is), isly.number()),
			fee: isly.record(isly.fromIs("Settlement.entries.fee", isoly.Currency.is), isly.number()),
			entries: isly
				.object<{
					status: "succeeded" | "failed"
					type: "capture" | "cancel" | "refund"
					account: string
					card: string
					transaction: string
					amount: [isoly.Currency, number]
					fee: [isoly.Currency, number]
				}>({
					status: isly.string(),
					type: isly.string(),
					account: isly.string(),
					card: isly.string(),
					transaction: isly.string(),
					amount: isly.tuple(isly.fromIs("Settlement.entries.amount", isoly.Currency.is), isly.number()),
					fee: isly.tuple(isly.fromIs("Settlement.entries.amount", isoly.Currency.is), isly.number()),
				})
				.array(),
			status: isly.string("succeeded"),
		}),
		isly.object<Failed>({
			id: isly.string(),
			created: isly.tuple(isly.string(), isly.fromIs("Settlement.created", isoly.DateTime.is)),
			configuration: isly.string(),
			status: isly.string("failed"),
		})
	)
	export const is = type.is
	export const flaw = type.flaw
	export type Result = (Transaction | (gracely.Error & { id: string }))[]
}
