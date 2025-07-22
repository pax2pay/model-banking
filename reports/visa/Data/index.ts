import { isoly } from "isoly"
import { Card } from "../../../Card"
import { Transaction } from "../../../Transaction"
import { rows } from "../rows"
import { Cards } from "./Cards"
import { Country as DataCountry } from "./Country"
import { Iin as DataIin } from "./Iin"
import { NonMonthly } from "./NonMonthly"
import { Regional } from "./Regional"

export interface Data {
	regional: Regional
	nonMonthly: NonMonthly
	country: Data.Country
}
export namespace Data {
	export import Iin = DataIin
	export import Country = DataCountry
	export function create(
		transactions: Transaction.CardTransaction[],
		cards: Card[],
		range: { start: isoly.Date; end: isoly.Date }
	): Data {
		const result: Data = { regional: {}, nonMonthly: NonMonthly.empty(), country: {} }
		for (const transaction of transactions) {
			result.nonMonthly = NonMonthly.update(result.nonMonthly, transaction)
			result.regional = Regional.update(result.regional, transaction)
			result.country = Country.update(result.country, transaction)
		}
		result.nonMonthly = { ...result.nonMonthly, ...Cards.report(result.nonMonthly, cards, range) }
		return result
	}
	export function merge(previous: Data, addition: Data): Data {
		const result: Data = {
			regional: Regional.merge(previous.regional, addition.regional),
			nonMonthly: NonMonthly.merge(previous.nonMonthly, addition.nonMonthly),
			country: Data.Country.merge(previous.country, addition.country),
		}
		return result
	}
	export function toCsv(data: Data, row: rows.NonZero): string {
		let result: string
		if (row.endsWith("Month x"))
			result = Regional.toCsvRow(data.regional, row)
		else
			result = NonMonthly.toCsvRow(data.nonMonthly, row)
		return result
	}
}
