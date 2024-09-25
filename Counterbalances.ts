import { isoly } from "isoly"
import { isly } from "isly"
import { Counterbalance } from "./Counterbalance"

export type Counterbalances = Partial<Record<isoly.Currency, Counterbalance>>

export namespace Counterbalances {
	export const type = isly.record<Counterbalances>(
		isly.fromIs("isoly.Currency", isoly.Currency.is),
		Counterbalance.type
	)
}
