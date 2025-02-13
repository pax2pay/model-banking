import { isoly } from "isoly"
import { Transaction } from "../../../Transaction"
import { Iin } from "./Iin"
import { PerMonth } from "./PerMonth"
import { Regional } from "./Regional"

type PerCountry = {
	present?: PerMonth
	notPresent?: PerMonth
}

export type Country = Partial<Record<isoly.CountryCode.Alpha2, PerCountry>>
export namespace Country {
	export function toCsv(country: Country): string {
		let result = ""
		for (const [countryCode, perMonth] of Object.entries(country)) {
			const region = Regional.getRegion(countryCode)
			const months = [1, 2, 3] as const
			for (const month of months) {
				result += `Country ${countryCode} - ${region} Card Present Count Month ${month}`
				for (const iin of Iin.values)
					result += `,${perMonth.present?.[month].count[iin] ?? 0}`
				result += "\n"
			}
			for (const month of months) {
				result += `Country ${countryCode} - ${region} Card Present Volume Month ${month}`
				for (const iin of Iin.values)
					result += `,${perMonth.present?.[month].volume[iin] ?? 0}`
				result += "\n"
			}
			for (const month of months) {
				result += `Country ${countryCode} - ${region} Card Not Present Count Month ${month}`
				for (const iin of Iin.values)
					result += `,${perMonth.notPresent?.[month].count[iin] ?? 0}`
				result += "\n"
			}
			for (const month of months) {
				result += `Country ${countryCode} - ${region} Card Not Present Volume Month ${month}`
				for (const iin of Iin.values)
					result += `,${perMonth.notPresent?.[month].volume[iin] ?? 0}`
				result += "\n"
			}
		}
		return result
	}
	// returns which number of the month in the quarter the transaction is in
	export function getMonth(transaction: Transaction.CardTransaction): 1 | 2 | 3 {
		const month = isoly.DateTime.getMonth(transaction.transacted ?? transaction.posted)
		return (((month - 1) % 3) + 1) as 1 | 2 | 3
	}
	export function update(country: Country, transaction: Transaction.CardTransaction): Country {
		const result: Country = country
		result[transaction.counterpart.merchant.country] = updateHelper(
			result[transaction.counterpart.merchant.country] ?? {},
			transaction
		)
		return result
	}
	export function updateHelper(value: PerCountry, transaction: Transaction.CardTransaction): PerCountry {
		const key = transaction.counterpart.present === true ? "present" : "notPresent"
		value[key] = Regional.update(value[key], transaction)
		return value
	}
}
