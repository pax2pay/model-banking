import { isoly } from "isoly"
import { isly } from "isly"
import { Transaction } from "../../Transaction"

export type Region = typeof Region.values[number]
export namespace Region {
	export const values = [
		"National Payments",
		"International - Intra-Regional Payments",
		"International - Non-EEA Payments",
		"International - Inter-Regional Payments",
	] as const
	export const type = isly.string<Region>(values)
	export const regions: Record<Region, isoly.CountryCode.Alpha2[]> = {
		"National Payments": ["GB"],
		"International - Intra-Regional Payments": [
			"AT",
			"BE",
			"BG",
			"HR",
			"CY",
			"CZ",
			"DK",
			"EE",
			"FI",
			"FR",
			"DE",
			"GR",
			"HU",
			"IE",
			"IT",
			"LV",
			"LT",
			"LU",
			"MT",
			"NL",
			"PL",
			"PT",
			"RO",
			"SK",
			"SI",
			"ES",
			"SE",
		],
		"International - Non-EEA Payments": [],
		"International - Inter-Regional Payments": ["IS", "NO", "LI"],
	}
	export function find(transaction: Transaction.CardTransaction): Region {
		let result: Region
		if (regions["National Payments"].includes(transaction.counterpart.merchant.country))
			result = "National Payments"
		else if (regions["International - Intra-Regional Payments"].includes(transaction.counterpart.merchant.country))
			result = "International - Intra-Regional Payments"
		else if (regions["International - Inter-Regional Payments"].includes(transaction.counterpart.merchant.country))
			result = "International - Inter-Regional Payments"
		else
			result = "International - Non-EEA Payments"
		return result
	}
}
