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
}
