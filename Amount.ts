import { isoly } from "isoly"
import { isly } from "isly"

export type Amount = [isoly.Currency, number]

export namespace Amount {
	export const type = isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number())
	export const is = type.is
	export const flaw = type.flaw
}
