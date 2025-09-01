import { isoly } from "isoly"
import { isly } from "isly"
import { Balance as AccountBalance } from "../Balance"
import { Counterbalance as CounterbalanceOperation } from "../Counterbalance"
import type { Settlement } from "../Settlement"
import { Change } from "./Change"

export type Changes = Partial<Record<Changes.Entry.Balance, Change>> & Record<Changes.Entry.Counterbalance, Change>
export namespace Changes {
	export function available(changes: MaybeLegacy, currency: isoly.Currency, legacy: boolean = false): number {
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
			: "available" in changes
			? (changes.available?.type == "subtract" ? -1 : 1) * (changes.available?.amount ?? 0)
			: 0
	}
	export function reserved(changes: MaybeLegacy, currency: isoly.Currency): number {
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
		export type Entry = AccountBalance.Legacy.Entry | Legacy.Entry.Counterbalance
		export namespace Entry {
			export function split(counterbalance: Counterbalance): [isoly.DateTime, CounterbalanceOperation.Link] {
				const split = counterbalance.split("-")
				const hour = split.splice(-3, 3).join("-")
				return [hour, split.join("-")]
			}
			export type Balance = typeof AccountBalance.Legacy.Entry.values[number]
			export namespace Balance {
				export const type = AccountBalance.Legacy.Entry.type
			}
			export type Counterbalance = `${CounterbalanceOperation.Link}-${isoly.DateTime}`
		}
	}
	export type Entry = Entry.Balance | Entry.Counterbalance
	export namespace Entry {
		export const type = isly.string<Entry>()
		export type Counterbalance = `${isoly.DateTime}-${CounterbalanceOperation.Link}`
		export function getBalanceType(key: string): string {
			let result = ""
			if (key.includes("net") || key.includes("fee"))
				result = "collecting"
			else if (key.toLowerCase().includes("reserved") || key === "available")
				result = "balance"
			else if (key.includes("internal"))
				result = "equalizing"
			else
				result = "fiat"
			return result
		}
		export function split(counterbalance: Counterbalance): [isoly.DateTime, CounterbalanceOperation.Link] {
			const split = counterbalance.split("-")
			const hour = split.slice(0, 3).join("-")
			return isoly.DateTime.is(hour)
				? [hour, split.slice(3, split.length).join("-")]
				: Legacy.Entry.split(counterbalance)
		}
		export type Balance = typeof Balance.values[number]
		export namespace Balance {
			export const values = ["available", "reserved-incoming", "reserved-outgoing", "reserved-buffer"] as const
			export const type = isly.string<Balance>(values)
		}
	}
	export function fromCapture(settlement: string, amounts: { net: number; fee: number }): Changes {
		return {
			[`${settlement}-net`]: { type: "add" as const, amount: amounts.net, status: "pending" as const },
			[`${settlement}-fee`]: { type: "add" as const, amount: amounts.fee, status: "pending" as const },
		}
	}
	export function fromRefund(refund: Settlement.Entry.Creatable.Refund, sum: Sum): Changes {
		const currency = refund.amount[0]
		const fee = Math.abs(refund.fee.other[currency] ?? 0)
		const net = Math.abs(refund.amount[1])
		const available = isoly.Currency.add(currency, fee, net)
		return {
			available: { type: available > 0 ? "add" : "subtract", amount: Math.abs(available), status: "pending" },
			["reserved-incoming"]: {
				type: "subtract",
				amount: sum["reserved-incoming"] ?? 0,
				status: "pending",
			},
		}
	}
}
