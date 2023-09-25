import { isoly } from "isoly"
import { isly } from "isly"
import { Counters as CountersBalances } from "./Counters"

export type Balances = Partial<Record<isoly.Currency, Partial<Record<Balances.Entry, number>>>>

export namespace Balances {
	export const entries = ["actual", "incomingReserved", "outgoingReserved"] as const
	export type Entry = typeof entries[number]
	export const type = isly.record(
		isly.fromIs("isoly.Currency", isoly.Currency.is),
		isly.record(isly.string(entries), isly.number())
	)
	export const is = type.is
	export type Counters = CountersBalances
	export const Counters = CountersBalances
	export namespace Counters {
		export type Counter = CountersBalances.Counter
	}
}
