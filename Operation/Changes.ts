import { isoly } from "isoly"
import { isly } from "isly"
import { Balance as AccountBalance } from "../Balance"
import { Counterbalance as CounterbalanceOperation } from "../Counterbalance"
import { Change } from "./Change"

export type Changes = Partial<Record<Changes.Entry.Balance, Change>> & Record<Changes.Entry.Counterbalance, Change>
export namespace Changes {
	export function available(changes: Changes, currency: isoly.Currency, legacy: boolean = false): number {
		return legacy
			? Object.entries(changes).reduce(
					(r, [entry, change]) =>
						isoly.Currency.add(
							currency,
							r,
							AccountBalance.Legacy.Entry.type.is(entry)
								? (entry == "actual" ? 1 : -1) * (change.type == "subtract" ? -1 : 1) * (change.amount ?? 0)
								: 0
						),
					0
			  )
			: (changes.available?.type == "subtract" ? -1 : 1) * (changes.available?.amount ?? 0)
	}
	export function reserved(changes: Changes, currency: isoly.Currency): number {
		return Object.entries(changes).reduce(
			(r, [entry, change]) =>
				isoly.Currency.add(
					currency,
					r,
					entry == "actual" ||
						entry == "available" ||
						(!AccountBalance.Legacy.Entry.type.is(entry) && !Entry.Balance.type.is(entry))
						? 0
						: (change.type == "subtract" ? -1 : 1) * (change.amount ?? 0)
				),
			0
		)
	}
	export function counterbalance(changes: Changes, currency: isoly.Currency): number {
		return Object.entries(changes).reduce(
			(r, [entry, change]) =>
				isoly.Currency.add(
					currency,
					r,
					Entry.Balance.type.is(entry) ? 0 : (change.type == "subtract" ? -1 : 1) * (change.amount ?? 0)
				),
			0
		)
	}
	export type Sum = Partial<Record<Changes.Entry.Balance, number>> & Record<Changes.Entry.Counterbalance, number>
	export type MaybeLegacy = Changes | Legacy
	export const type = isly.record<Legacy>(isly.string(), Change.type)
	export type Legacy = Partial<Record<AccountBalance.Legacy.Entry, Change>> &
		Record<Changes.Entry.Counterbalance, Change>
	export namespace Legacy {
		export const type = isly.record<Legacy>(isly.string(), Change.type)
		export const is = type.is
		export const flaw = type.flaw
		export type Entry = AccountBalance.Legacy.Entry | Legacy.Entry.Counterbalance
		export namespace Entry {
			export type Balance = typeof AccountBalance.Legacy.Entry.values[number]
			export namespace Balance {
				export const type = AccountBalance.Legacy.Entry.type
			}
			export type Counterbalance = `${CounterbalanceOperation.Link}-${isoly.DateTime}`
		}
	}
	export type Entry = Changes.Entry.Balance | Changes.Entry.Counterbalance
	export namespace Entry {
		export const type = isly.string<Entry>()
		export type Counterbalance = `${CounterbalanceOperation.Link}-${isoly.DateTime}`
		export function split(counterbalance: Counterbalance): [CounterbalanceOperation.Link, isoly.DateTime] {
			const split = counterbalance.split("-")
			const hour = split.splice(-3, split.length - 1).join("-")
			return [split.join("-"), hour]
		}
		export type Balance = typeof Balance.values[number]
		export namespace Balance {
			export const values = ["available", "incomingReserved", "outgoingReserved", "bufferReserved"] as const
			export const type = isly.string<Balance>(values)
		}
	}
	export function fromCapture(
		settlement: string | undefined, // FIXME: remove | undefined when we're sure we send the id
		amounts: { net: number; fee: number; charge?: number }
	): Changes {
		return {
			[`${settlement}-net`]: { type: "add" as const, amount: amounts.net, status: "pending" as const },
			[`${settlement}-fee`]: { type: "add" as const, amount: amounts.fee, status: "pending" as const },
			...(amounts.charge && {
				[`${settlement}-charge`]: { type: "add" as const, amount: amounts.charge, status: "pending" as const },
			}),
		}
	}
}
