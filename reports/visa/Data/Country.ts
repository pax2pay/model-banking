import { isoly } from "isoly"
import { Transaction } from "../../../Transaction"
import { Iin } from "./Iin"
import { PerMonth } from "./PerMonth"
import { Regional } from "./Regional"

type PerCountry = { present?: PerMonth; notPresent?: PerMonth }
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
	export function update(country: Country, transaction: Transaction.CardTransaction): Country {
		const result: Country = country
		result[transaction.counterpart.merchant.country] = updateHelper(
			result[transaction.counterpart.merchant.country] ?? {},
			transaction
		)
		return result
	}
	function updateHelper(input: PerCountry, transaction: Transaction.CardTransaction): PerCountry {
		const result = input
		const key = transaction.counterpart.present === true ? "present" : "notPresent"
		result[key] = PerMonth.update(result[key], transaction)
		return result
	}
}
