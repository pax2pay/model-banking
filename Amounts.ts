import { isoly } from "isoly"
import { isly } from "isly"

export type Amounts = Partial<Record<isoly.Currency, number>>

export namespace Amounts {
	export const type = isly.record<Amounts>(isly.string(isoly.Currency.types), isly.number())
	export const is = type.is
	export const flaw = type.flaw
}
