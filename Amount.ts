import { isoly } from "isoly"
import { isoly as isoly2 } from "isoly2"
import { isly } from "isly"
import { isly as isly2 } from "isly2"
import { Amounts } from "./Amounts"

export type Amount = [isoly.Currency, number]

export namespace Amount {
	export function toAmounts(amount?: Amount): Amounts {
		return !amount ? {} : Object.fromEntries<number>([amount])
	}
	export const type = isly.tuple<Amount>(isly.string(isoly.Currency.values), isly.number())
	export const type2 = isly2.tuple<Amount>(
		isoly2.Currency.type,
		isly2.number().rename("Amount").describe("The amount of the amount")
	)
}
