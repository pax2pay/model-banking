import { isoly } from "isoly"
import { isly } from "isly"
import { Counterbalance2 } from "./Counterbalance2"

export type Counterbalances2 = Partial<Record<isoly.Currency, Counterbalance2>>

export namespace Counterbalances {
	export function add(addendee: Counterbalances2, addend: Counterbalances2): Counterbalances2 {
		const result: Counterbalances2 = {}
		for (const [currency, Counterbalance] of Object.entries(addendee) as [isoly.Currency, Counterbalance2][]) {
			result[currency] = Counterbalance2.add(currency, Counterbalance, addend[currency] ?? { minted: {}, burned: {} })
		}
		return result
	}
	export const type = isly.record<Counterbalances2>(
		isly.fromIs("isoly.Currency", isoly.Currency.is),
		Counterbalance2.type
	)
}
