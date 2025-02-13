import { Transaction } from "../../../Transaction"
import { Iin } from "./Iin"
import { Monthly } from "./Monthly"
import { Region } from "./Region"

export type Regional = Partial<Record<Region, Monthly>>
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
		result[region] = Monthly.update(result[region], transaction)
		return result
	}
	export function toCsvRow(regional: Regional, row: string): string {
		const key = Regional.getRegion(row)
		let result = ""
		const which: "count" | "volume" = row.includes("Count") ? "count" : "volume"
		for (const month of Monthly.Month.values) {
			result += row.replace("Month x", `Month ${month}`)
			for (const iin of Iin.values)
				result += `,${regional[key]?.[month][which][iin] ?? 0}`
			result += "\n"
		}
		return result
	}
}
