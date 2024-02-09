import { isoly } from "isoly"
import { isly } from "isly"

export type FX = Partial<Record<isoly.Currency, Partial<Record<isoly.Currency, number>>>>

export namespace FX {
	export const type = isly.record(
		isly.fromIs("Currency", isoly.Currency.is),
		isly.record(isly.fromIs("Currency", isoly.Currency.is), isly.number())
	)
	export const is = type.is
	export const flaw = type.flaw
	export function convert(amount: number, from: isoly.Currency, to: isoly.Currency, fx: FX): number | undefined {
		const rate = fx[to]?.[from]
		return rate && isoly.Currency.divide(to, amount, rate)
	}
}
