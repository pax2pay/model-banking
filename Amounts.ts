import { isoly } from "isoly"
import { isly } from "isly"

export type Amounts = Partial<Record<isoly.Currency, number>>

export namespace Amounts {
	export function add(addendee: Amounts, addend: Amounts): Amounts {
		return (Object.entries(addend) as [isoly.Currency, number][]).reduce(
			(r: Amounts, [currency, amount]) => ({
				...r,
				[currency]: isoly.Currency.add(currency, addendee[currency] ?? 0, amount),
			}),
			addendee
		)
	}
	export const type = isly.record<Amounts>(isly.string(isoly.Currency.types), isly.number())
	export const is = type.is
	export const flaw = type.flaw
}
