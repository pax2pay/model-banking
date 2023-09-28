import { isoly } from "isoly"
import { isly } from "isly"

export type Balances = Partial<Record<isoly.Currency, Partial<Record<Balances.Entry, number>>>>

export namespace Balances {
	export const entries = ["actual", "incomingReserved", "outgoingReserved"] as const
	export type Entry = typeof entries[number]
	export const type = isly.record<Balances>(
		isly.fromIs("isoly.Currency", isoly.Currency.is),
		isly.record<Record<Balances.Entry, number>>(isly.string(entries), isly.number())
	)
	export const is = type.is
	export const flaw = type.flaw
}
