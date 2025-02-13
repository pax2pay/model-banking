import { Transaction } from "../../../Transaction"
import { Region } from "../Region"
import { Iin } from "./Iin"
import { PerMonth } from "./PerMonth"

export type Regional = Partial<Record<Region, PerMonth>>
export namespace Regional {
	export function getRegion(row: string): Region {
		let key: keyof Regional
		if (row.startsWith("National"))
			key = "National Payments"
		else if (row.startsWith("International - Inter-Regional"))
			key = "International - Inter-Regional Payments"
		else if (row.startsWith("International - Intra-Regional"))
			key = "International - Intra-Regional Payments"
		else
			key = "International - Non-EEA Payments"
		return key
	}
	export function update(previous: Regional, transaction: Transaction.CardTransaction): Regional {
		const region = Region.find(transaction)
		const result: Regional = previous
		result[region] = PerMonth.update(result[region], transaction)
		return result
	}
	export function toCsvRow(regional: Regional, row: string): string {
		const key = Regional.getRegion(row)
		const months = [1, 2, 3] as const
		let result = ""
		const which: "count" | "volume" = row.includes("Count") ? "count" : "volume"
		for (const month of months) {
			result += row.replace("Month x", `Month ${month}`)
			for (const iin of Iin.values)
				result += `,${regional[key]?.[month][which][iin] ?? 0}`
			result += "\n"
		}
		return result
	}
}
