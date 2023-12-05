import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"
import { Batch } from "../Settlement/Batch"
import { Supplier } from "../Supplier"

export type Counterbalance = Partial<Record<Counterbalance.Entry, number>>

export namespace Counterbalance {
	export type Entry = Entry.Internal | Entry.Settlement
	export namespace Entry {
		export type Internal = typeof Entry.values[number]
		export type Settlement = `${"fee" | "settle"}_${Card.Stack}_${Batch}`
		export const values = [
			...Supplier.names.flatMap(s => [`incoming_${s}`, `outgoing_${s}`] as const),
			`incoming_internal`,
			`outgoing_internal`,
			"fee_other",
		] as const
		const valueType = isly.string(values)
		export const type = isly.union<Entry, Internal, Settlement>(
			valueType,
			isly.string<Settlement>(new RegExp(/^(?:settle|fee)_(\w+-)+\w+_/.source + Batch.regexp.source))
		)
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = isly.record<Counterbalance>(Entry.type, isly.number()).optional()
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
