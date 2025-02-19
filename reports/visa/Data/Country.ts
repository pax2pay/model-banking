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
			result += csvLine(countryCode, region, perCountry, "present", "count")
			result += csvLine(countryCode, region, perCountry, "present", "volume")
			result += csvLine(countryCode, region, perCountry, "notPresent", "count")
			result += csvLine(countryCode, region, perCountry, "notPresent", "volume")
		}
		return result
	}
	export function csvLine(
		country: string,
		region: Region,
		data: PerCountry,
		presence: "present" | "notPresent",
		type: "count" | "volume"
	): string {
		let result = ""
		if (data[presence])
			for (const month of Monthly.Month.values) {
				result += `Country ${country} - ${region} Card ${presence == "present" ? "Present" : "Not Present"} ${
					type == "count" ? "Count" : "Volume"
				} - Month ${month}`
				for (const iin of Iin.values)
					result += `|${data[presence][month][type][iin] ?? 0}`
				result += "\n"
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
	export function merge(previous: Country, addition: Country): Country {
		const result: Country = {}
		for (const country of Object.keys(previous).concat(Object.keys(addition)) as isoly.CountryCode.Alpha2[])
			result[country] = mergePerCountry(previous[country] ?? {}, addition[country] ?? {})
		return result
	}
}
function mergePerCountry(previous: PerCountry, addition: PerCountry): PerCountry {
	return {
		present: Monthly.merge(previous.present, addition.present),
		notPresent: Monthly.merge(previous.notPresent, addition.notPresent),
	}
}
