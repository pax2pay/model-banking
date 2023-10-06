import { isoly } from "isoly"
import { isly } from "isly"
import { Counterbalance as CounterbalancesCounterBalance } from "./Counterbalance"

export type Counterbalances = Partial<Record<isoly.Currency, CounterbalancesCounterBalance>>
export namespace Counterbalances {
	export type Counterbalance = CounterbalancesCounterBalance
	export const Counterbalance = CounterbalancesCounterBalance
	export namespace Counterbalance {
		export type Entry = CounterbalancesCounterBalance.Entry
	}
	export const type = isly.record<Counterbalances>(
		isly.fromIs("isoly.Currency", isoly.Currency.is),
		CounterbalancesCounterBalance.type
	)
	export const is = type.is
	export const flaw = type.flaw
}
