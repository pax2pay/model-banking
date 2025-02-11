import { isoly } from "isoly"
import { isly } from "isly"
import { Transaction } from "../../Transaction"

export type Region = typeof Region.values[number]
export namespace Region {
	export const values = ["National", "Intra-Regional", "Inter-Regional", "Non-EEA"] as const
	export const type = isly.string<Region>(values)
	export const regions: Record<Region, isoly.CountryCode.Alpha2[]> = {
		National: ["GB"],
		"Intra-Regional": [
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
		"Inter-Regional": ["IS", "NO", "LI"],
		"Non-EEA": [],
	}
	export function find(transaction: Transaction.CardTransaction): Region {
		let result: Region
		if (regions.National.includes(transaction.counterpart.merchant.country))
			result = "National"
		else if (regions["Intra-Regional"].includes(transaction.counterpart.merchant.country))
			result = "Intra-Regional"
		else if (regions["Inter-Regional"].includes(transaction.counterpart.merchant.country))
			result = "Inter-Regional"
		else
			result = "Non-EEA"
		return result
	}
}
