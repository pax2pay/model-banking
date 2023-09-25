import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"
import { Supplier } from "../Supplier"

export type Counters = Partial<Record<isoly.Currency, Partial<Record<Counters.Counter, number>>>>

export namespace Counters {
	export const entries = [
		...Card.Stack.stacks.flatMap(s => ["fee." + s, "settle." + s] as const),
		...Supplier.names.flatMap(s => ["incoming." + s, "outgoing." + s] as const),
		"internal",
		"fee.other",
	] as const
	export type Counter = typeof entries[number]
	export const type = isly.record(
		isly.fromIs("isoly.Currency", isoly.Currency.is),
		isly.record(isly.string(entries), isly.number())
	)
}
