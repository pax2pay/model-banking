import { isoly } from "isoly"
import { isly } from "isly"
import { Amounts } from "./Amounts"

export type Amount = [isoly.Currency, number]

export namespace Amount {
	export function toAmounts(amount?: Amount): Amounts {
		return !amount ? {} : Object.fromEntries<number>([amount])
	}
	export const type = isly.tuple<Amount>(isly.string(isoly.Currency.types), isly.number())
}
