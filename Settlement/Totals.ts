import { isoly } from "isoly"
import { isly } from "isly"
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
	export function verify(totals: Totals, type: "outcome" | "settled"): boolean {
		return Object.values(totals).every(t => Total.verify(t, type))
	}
	export function add(addendee: Totals, addends: Partial<Record<isoly.Currency, Partial<Total>>>): Totals {
		const result = { ...addendee }
		for (const [currency, addend] of Object.entries(addends) as [isoly.Currency, Partial<Total>][]) {
			result[currency] = Total.add(currency, result[currency] ?? Total.create(), addend)
		}
		return result
	}
}
