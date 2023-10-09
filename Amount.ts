import { isoly } from "isoly"
import { isly } from "isly"
import { Amounts } from "./Amounts"

export type Amount = [isoly.Currency, number]

export namespace Amount {
	export function toAmounts(amount?: Amount): Amounts {
		return !amount ? {} : Object.fromEntries<number>([amount])
	}
	export const exchangeRate: Partial<Record<isoly.Currency, number>> = { USD: 1, GBP: 0.82, SEK: 11.05, EUR: 0.95 }
	export function convert(amount: Amount, target: Extract<isoly.Currency, "GBP" | "USD" | "SEK" | "EUR">) {
		return amount[0] == target ? amount : exchangeRate[amount[0]] && * amount
	}
	export const type = isly.tuple<Amount>(isly.string(isoly.Currency.types), isly.number())
	export const is = type.is
	export const flaw = type.flaw
}
