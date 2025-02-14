import { isoly } from "isoly"
import { Transaction } from "../../../Transaction"
import { Iin } from "./Iin"

export type Monthly = Record<
	Monthly.Month,
	{ count: Partial<Record<Iin, number>>; volume: Partial<Record<Iin, number>> }
>
export namespace Monthly {
	export type Month = typeof Month.values[number]
	export namespace Month {
		export const values = [1, 2, 3] as const
	}
	// returns which number of the month in the quarter the transaction is in
	export function getMonth(transaction: Transaction.CardTransaction): Monthly.Month {
		const month = isoly.DateTime.getMonth(transaction.transacted ?? transaction.posted)
		return (((month - 1) % 3) + 1) as Monthly.Month
	}
	export function update(previous: Monthly | undefined, transaction: Transaction.CardTransaction): Monthly {
		const result: Monthly = previous ?? {
			"1": { count: {}, volume: {} },
			"2": { count: {}, volume: {} },
			"3": { count: {}, volume: {} },
		}
		if (transaction.direction == "outbound" && transaction.status == "finalized") {
			const month = getMonth(transaction)
			result[month].count[transaction.account.iin as Iin] =
				(result[month].count[transaction.account.iin as Iin] ?? 0) + 1
			result[month].volume[transaction.account.iin as Iin] = isoly.Currency.add(
				"GBP",
				result[month].volume[transaction.account.iin as Iin] ?? 0,
				Math.abs(transaction.amount.original)
			)
			if (Iin.Idx.type.is(transaction.account.iin)) {
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
