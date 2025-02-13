import { Transaction } from "../../../Transaction"
import { rows } from "../rows"
import { Country as DataCountry } from "./Country"
import { Iin as DataIin } from "./Iin"
import { NonMonthly } from "./NonMonthly"
import { Regional } from "./Regional"

export type Data = {
	regional: Regional
	nonMonthly: NonMonthly
	country: Data.Country
}
export namespace Data {
	export import Iin = DataIin
	export import Country = DataCountry
	export function create(transactions: Transaction.CardTransaction[]): Data {
		const result: Data = { regional: {}, nonMonthly: NonMonthly.empty, country: {} }
		for (const transaction of transactions) {
			result.nonMonthly = NonMonthly.update(result.nonMonthly, transaction)
			result.regional = Regional.update(result.regional, transaction)
			result.country = Country.update(result.country, transaction)
		}
		return result
	}
	export function toCsv(data: Data, row: typeof rows.nonZero[number]): string {
		let result: string
		if (row.endsWith("Month x"))
			result = Regional.toCsvRow(data.regional, row)
		else
			result = NonMonthly.toCsvRow(data.nonMonthly, row)
		return result
	}
}
