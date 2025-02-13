import { isoly } from "isoly"
import { Transaction } from "../../../Transaction"
import { Iin } from "./Iin"
import { Monthly } from "./Monthly"
import { Region } from "./Region"

// data for rows of format:
// "Country X - Region X Payments Card Present Count - Month x",
// "Country X - Region X Payments Card Present Volume - Month x",
// "Country X - Region X Payments Card Not Present Count - Month x",
// "Country X - Region X Payments Card Not Present Volume - Month x",
type PerCountry = { present?: Monthly; notPresent?: Monthly }
export type Country = Partial<Record<isoly.CountryCode.Alpha2, PerCountry>>
export namespace Country {
	export function toCsv(country: Country): string {
		let result = ""
		for (const [countryCode, perCountry] of Object.entries(country)) {
			const region = Region.find(countryCode as isoly.CountryCode.Alpha2)
			for (const month of Monthly.Month.values) {
				result += `Country ${countryCode} - ${region} Card Present Count Month ${month}`
				for (const iin of Iin.values)
					result += `|${perCountry.present?.[month].count[iin] ?? 0}`
				result += "\n"
			}
			for (const month of Monthly.Month.values) {
				result += `Country ${countryCode} - ${region} Card Present Volume Month ${month}`
				for (const iin of Iin.values)
					result += `|${perCountry.present?.[month].volume[iin] ?? 0}`
				result += "\n"
			}
			for (const month of Monthly.Month.values) {
				result += `Country ${countryCode} - ${region} Card Not Present Count Month ${month}`
				for (const iin of Iin.values)
					result += `|${perCountry.notPresent?.[month].count[iin] ?? 0}`
				result += "\n"
			}
			for (const month of Monthly.Month.values) {
				result += `Country ${countryCode} - ${region} Card Not Present Volume Month ${month}`
				for (const iin of Iin.values)
					result += `|${perCountry.notPresent?.[month].volume[iin] ?? 0}`
				result += "\n"
			}
		}
		return result
	}
	export function update(country: Country, transaction: Transaction.CardTransaction): Country {
		const result: Country = country
		result[transaction.counterpart.merchant.country] = updatePerCountry(
			result[transaction.counterpart.merchant.country] ?? {},
			transaction
		)
		return result
	}
	function updatePerCountry(input: PerCountry, transaction: Transaction.CardTransaction): PerCountry {
		const result = input
		const key = transaction.counterpart.present === true ? "present" : "notPresent"
		result[key] = Monthly.update(result[key], transaction)
		return result
	}
}
