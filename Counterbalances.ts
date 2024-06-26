import { isoly } from "isoly"
import { isly } from "isly"
import { Counterbalance } from "./Counterbalance"

export type Counterbalances = Partial<Record<isoly.Currency, Counterbalance>>

export namespace Counterbalances {
	export function add(addendee: Counterbalances, addend: Counterbalances): Counterbalances {
		const result: Counterbalances = {}
		for (const [currency, counterbalance] of Object.entries(addendee) as [isoly.Currency, Counterbalance][]) {
			result[currency] = Counterbalance.add(currency, counterbalance, addend[currency] ?? { minted: {}, burned: {} })
		}
		return result
	}
	export const type = isly.record<Counterbalances>(
		isly.fromIs("isoly.Currency", isoly.Currency.is),
		Counterbalance.type
	)
}
