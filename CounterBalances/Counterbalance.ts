import { isly } from "isly"
import { Card } from "../Card"
import { Supplier } from "../Supplier"

export type Counterbalance = Partial<Record<Counterbalance.Entry, number>>

export namespace Counterbalance {
	export type Entry = typeof Entry.values[number]
	export namespace Entry {
		export const values = [
			...Card.Stack.stacks.flatMap(s => [`fee.${s}`, `settle.${s}`] as const),
			...Supplier.names.flatMap(s => [`incoming.${s}`, `outgoing.${s}`] as const),
			`incoming.internal`,
			`outgoing.internal`,
			"fee.other",
		] as const
		export const type = isly.string(Entry.values)
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = isly.record<Counterbalance>(Entry.type, isly.number())
	export const is = type.is
	export const flaw = type.flaw
}
