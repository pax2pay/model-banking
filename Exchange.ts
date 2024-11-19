import { isoly } from "isoly"
import { isly } from "isly"

export namespace Exchange {
	export type Rates = Partial<Record<isoly.Currency, Partial<Record<isoly.Currency, number>>>>
	export const type = isly.record(
		isly.fromIs("Currency", isoly.Currency.is),
		isly.record(isly.fromIs("Currency", isoly.Currency.is), isly.number())
	)
	export function convert(
		amount: number,
		from: isoly.Currency,
		to: isoly.Currency,
		table: Exchange.Rates
	): number | undefined {
		const rate = table[to]?.[from]
		return rate && isoly.Currency.divide(to, amount, rate)
	}
}
