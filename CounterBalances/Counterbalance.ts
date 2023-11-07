import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"
import { Supplier } from "../Supplier"

export type Counterbalance = Partial<Record<Counterbalance.Entry, number>>

export namespace Counterbalance {
	export type Entry = typeof Entry.values[number]
	export namespace Entry {
		export const values = [
			...Card.Stack.stacks.flatMap(s => [`fee_${s}`, `settle_${s}`] as const),
			...Supplier.names.flatMap(s => [`incoming_${s}`, `outgoing_${s}`] as const),
			`incoming_internal`,
			`outgoing_internal`,
			"fee_other",
		] as const
		export const type = isly.string(Entry.values)
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = isly.record<Counterbalance>(Entry.type, isly.number())
	export const is = type.is
	export const flaw = type.flaw
	export function add(addendee: Counterbalance, addend: Counterbalance, currency: isoly.Currency): Counterbalance {
		return (Object.entries(addend) as [Entry, number][]).reduce(
			(r: Counterbalance, [entry, amount]) => ({
				...r,
				[entry]: isoly.Currency.add(currency, addendee[entry] ?? 0, amount),
			}),
			addendee
		)
	}
}
