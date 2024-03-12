import { isoly } from "isoly"
import { isly } from "isly"
import type { Collect } from "../Transaction/Collect"
import { Amount } from "./Amount"
import { Entry } from "./Entry"
import { Total } from "./Total"

export type Totals = Partial<Record<isoly.Currency, Total>>
export namespace Totals {
	export const type = isly.record<isoly.Currency, Total>(isly.string(isoly.Currency.types), Total.type)
	export function addEntry(totals: Totals, entry: Entry): Totals {
		const result = { ...totals }
		if (entry.status == "succeeded" && (entry.type == "capture" || entry.type == "refund")) {
			result[entry.amount[0]] = Total.add(entry.amount[0], result[entry.amount[0]] ?? Total.create(), {
				outcome: {
					net: entry.amount[1],
					// TODO: other currencies in fees
					fee: { other: entry.fee.other[entry.amount[0]] ?? 0 },
				},
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
	export function add(addendee: Totals, addends: Partial<Record<isoly.Currency, Partial<Total>>>): Totals {
		const result = { ...addendee }
		for (const [currency, addend] of Object.entries(addends) as [isoly.Currency, Partial<Total>][]) {
			result[currency] = Total.add(currency, result[currency] ?? Total.create(), addend)
		}
		return result
	}
	// TODO: update this for new collection method
	export function collect(totals: Totals, collect: Collect): Totals {
		const result: Totals = { ...totals }
		for (const [currency, counterbalance] of Object.entries(collect.counterbalances)) {
			const collected: Amount = { net: 0, fee: { other: 0 } }
			for (const [entry, amount] of Object.entries(counterbalance)) {
				if (entry.startsWith("fee"))
					collected.fee.other = isoly.Currency.add(currency as isoly.Currency, collected.fee.other, amount ?? 0)
				else if (entry.startsWith("settle"))
					collected.net = isoly.Currency.add(currency as isoly.Currency, collected.net, amount ?? 0)
			}
			result[currency as isoly.Currency] = Total.collect(
				currency as isoly.Currency,
				result[currency as isoly.Currency] ?? Total.create(),
				collected,
				{ net: "", fee: "" }
			)
		}
		return result
	}
}
