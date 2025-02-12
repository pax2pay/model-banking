import { isoly } from "isoly"
import { Transaction } from "../../../Transaction"
import { PerMonth } from "./PerMonth"

export type Monthly = Record<Monthly.Key, PerMonth>
export namespace Monthly {
	export namespace Key {
		export const values = [
			"National Payments",
			"International - Intra-Regional Payments",
			"International - Non-EEA Payments",
			"International - Inter-Regional Payments",
		] as const
	}
	export type Key = typeof Key.values[number]
	export function getKey(row: string): Key {
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
	export function getMonth(transaction: Transaction.CardTransaction): 1 | 2 | 3 {
		return 1 // TODO: figure out month number
	}
	export function update(previous: PerMonth | undefined, transaction: Transaction.CardTransaction): PerMonth {
		const result: PerMonth = previous ?? {
			"1": { count: 0, volume: 0 },
			"2": { count: 0, volume: 0 },
			"3": { count: 0, volume: 0 },
		}
		if (transaction.direction == "outbound") {
			const month = getMonth(transaction)
			result[month].count++
			result[month].volume = isoly.Currency.add("GBP", result[month].volume, Math.abs(transaction.amount.original))
		}
		return result
	}
}
