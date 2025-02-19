import { Transaction } from "../../../Transaction"
import { Iin } from "./Iin"
import { Monthly } from "./Monthly"
import { Region } from "./Region"

export type Regional = Partial<Record<Region, Monthly>>
export namespace Regional {
	export function update(previous: Regional, transaction: Transaction.CardTransaction): Regional {
		const region = Region.find(transaction.counterpart.merchant.country)
		const result: Regional = previous
		result[region] = Monthly.update(result[region], transaction)
		return result
	}
	export function merge(previous: Regional, addition: Regional): Regional {
		const result: Regional = {}
		for (const region of Region.values)
			result[region] = Monthly.merge(previous[region], addition[region])
		return result
	}
	export function toCsvRow(regional: Regional, row: string): string {
		let result = ""
		const region = Region.fromRow(row)
		const key: "count" | "volume" = row.includes("Count") ? "count" : "volume"
		for (const month of Monthly.Month.values) {
			result += row.replace("Month x", `Month ${month}`)
			for (const iin of Iin.values)
				result += `|${regional[region]?.[month][key][iin] ?? 0}`
			result += "\n"
		}
		return result
	}
}
