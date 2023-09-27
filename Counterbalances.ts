import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "./Card"
import { Supplier } from "./Supplier"

export type Counterbalances = Partial<Record<isoly.Currency, Partial<Record<Counterbalances.Counter, number>>>>

export namespace Counterbalances {
	export const entries = [
		...Card.Stack.stacks.flatMap(s => [`fee.${s}`, `settle.${s}`] as const),
		...Supplier.names.flatMap(s => [`incoming.${s}`, `outgoing.${s}`] as const),
		"internal",
		"fee.other",
	] as const
	export type Counter = typeof entries[number]
	export const type = isly.record<Counterbalances>(
		isly.fromIs("isoly.Currency", isoly.Currency.is),
		isly.record<Partial<Record<Counterbalances.Counter, number>>>(isly.string(entries), isly.number())
	)
	export const is = type.is
	export const flaw = type.flaw
}
