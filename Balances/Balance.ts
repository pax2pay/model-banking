import { isoly } from "isoly"
import { isly } from "isly"

export type Balance = Partial<Record<Balance.Entry, number>>

export namespace Balance {
	export type Entry = typeof Entry.values[number]
	export namespace Entry {
		export const values = ["actual", "incomingReserved", "outgoingReserved"] as const
		export const type = isly.string(values)
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = isly.record<Balance>(Entry.type, isly.number())
	export const is = type.is
	export const flaw = type.flaw
	export function add(addendee: Balance, addend: Balance, currency: isoly.Currency): Balance {
		return (Object.entries(addend) as [Entry, number][]).reduce(
			(r: Balance, [entry, amount]) => ({
				...r,
				[entry]: isoly.Currency.add(currency, addendee[entry] ?? 0, amount),
			}),
			addendee
		)
	}
}
