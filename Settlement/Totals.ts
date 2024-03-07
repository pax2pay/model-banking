import { isoly } from "isoly"
import { isly } from "isly"
import type { Collect } from "../Transaction/Collect"
import { Entry } from "./Entry"
import { Total } from "./Total"

export type Totals = Partial<Record<isoly.Currency, Total>>
export namespace Totals {
	export const type = isly.record<isoly.Currency, Total>(isly.string(isoly.Currency.types), Total.type)
	export function addEntry(totals: Totals, entry: Entry): Totals {
		const result = { ...totals }
		if (entry.status == "succeeded" && (entry.type == "capture" || entry.type == "refund")) {
			result[entry.amount[0]] = Total.add.outcome(entry.amount[0], result[entry.amount[0]] ?? Total.create(), {
				net: entry.amount[1],
				// TODO: other currencies in fees
				fee: { other: entry.fee.other[entry.amount[0]] ?? 0 },
			})
		}
		return result
	}
	export function verify(totals: Totals, type: "outcome" | "collected" | "settled"): [isoly.Currency, boolean][] {
		const result: [isoly.Currency, boolean][] = []
		for (const [currency, total] of Object.entries(totals)) {
			result.push([currency as isoly.Currency, Total.verify(total, type)])
		}
		return result
	}
	export namespace add {
		export function settled(totals: Totals, settles: Partial<Record<isoly.Currency, Total.Settled>>): Totals {
			const result = { ...totals }
			for (const [currency, settled] of Object.entries(settles) as [isoly.Currency, Total.Settled][]) {
				result[currency] = Total.add.settled(
					currency,
					result[currency] ?? Total.create(),
					settled.net,
					settled.transactions
				)
			}
			return result
		}
		// TODO: update this for new collection method
		export function collected(totals: Totals, collect: Collect): Totals {
			const result: Totals = { ...totals }
			for (const [currency, counterbalance] of Object.entries(collect.counterbalances)) {
				const collected: Total.Amount = { net: 0, fee: { other: 0 } }
				for (const [entry, amount] of Object.entries(counterbalance)) {
					if (entry.startsWith("fee"))
						collected.fee.other = isoly.Currency.add(currency as isoly.Currency, collected.fee.other, amount ?? 0)
					else if (entry.startsWith("settle"))
						collected.net = isoly.Currency.add(currency as isoly.Currency, collected.net, amount ?? 0)
				}
				result[currency as isoly.Currency] = Total.add.collected(
					currency as isoly.Currency,
					result[currency as isoly.Currency] ?? Total.create(),
					collected,
					{ net: "", fee: "" }
				)
			}
			return result
		}
	}
}
