import { isoly } from "isoly"
import { Transaction } from "../../../Transaction"
import { Iin } from "./Iin"

export type PerMonth = Record<1 | 2 | 3, { count: Partial<Record<Iin, number>>; volume: Partial<Record<Iin, number>> }>
export namespace PerMonth {
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
}
