import { isoly } from "isoly"
import { Transaction } from "../../../Transaction"
import { Region } from "../Region"
import { Iin } from "./Iin"
import { PerMonth } from "./PerMonth"

export type Monthly = Partial<Record<Region, PerMonth>>
export namespace Monthly {
	export function getRegion(row: string): Region {
		let key: keyof Monthly
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
	// returns which number of the month in the quarter the transaction is in
	export function getMonth(transaction: Transaction.CardTransaction): 1 | 2 | 3 {
		const month = isoly.DateTime.getMonth(transaction.transacted ?? transaction.posted)
		return (((month - 1) % 3) + 1) as 1 | 2 | 3
	}
	export function update(previous: PerMonth | undefined, transaction: Transaction.CardTransaction): PerMonth {
		const result: PerMonth = previous ?? {
			"1": { count: {}, volume: {} },
			"2": { count: {}, volume: {} },
			"3": { count: {}, volume: {} },
		}
		if (transaction.direction == "outbound") {
			const month = getMonth(transaction)
			result[month].count[transaction.account.iin as Iin] =
				(result[month].count[transaction.account.iin as Iin] ?? 0) + 1
			result[month].volume[transaction.account.iin as Iin] = isoly.Currency.add(
				"GBP",
				result[month].volume[transaction.account.iin as Iin] ?? 0,
				Math.abs(transaction.amount.original)
			)
			if (Iin.isIdx(transaction.account.iin)) {
				result[month].count["totalIdx"] = (result[month].count["totalIdx"] ?? 0) + 1
				result[month].volume["totalIdx"] = isoly.Currency.add(
					"GBP",
					result[month].volume["totalIdx"] ?? 0,
					Math.abs(transaction.amount.original)
				)
			}
		}
		return result
	}
	export function toCsvRow(monthly: Monthly, row: string): string {
		const key = Monthly.getRegion(row)
		const months = [1, 2, 3] as const
		let result = ""
		const which: "count" | "volume" = row.includes("Count") ? "count" : "volume"
		for (const month of months) {
			result += row.replace("Month x", `Month ${month}`)
			for (const iin of Iin.values)
				result += `,${monthly[key]?.[month][which][iin] ?? 0}`
			result += "\n"
		}
		return result
	}
}
