import { isoly } from "isoly"
import { Card } from "Card"
import { Transaction } from "../../../Transaction"
import { rows } from "../rows"
import { Iin } from "./Iin"

export type NonMonthly = Record<
	| "Total Number of Cards"
	| "Total Number of Active Cards"
	| "Total Number of Accounts"
	| "Number of Accounts - International Enabled"
	| "Payments Transactions Declined for Insufficient Funds - Number"
	| "Total Number of Active Accounts",
	Partial<Record<Iin, number>>
>
export namespace NonMonthly {
	export function empty(): NonMonthly {
		return {
			"Number of Accounts - International Enabled": {},
			"Payments Transactions Declined for Insufficient Funds - Number": {},
			"Total Number of Accounts": {},
			"Total Number of Active Cards": {},
			"Total Number of Cards": {},
			"Total Number of Active Accounts": {},
		}
	}
	export function update(previous: NonMonthly, transaction: Transaction.CardTransaction): NonMonthly {
		const result = previous
		if (Array.isArray(transaction.status) && transaction.status[1] == "insufficient funds")
			result["Payments Transactions Declined for Insufficient Funds - Number"][transaction.account.iin as Iin] =
				(result["Payments Transactions Declined for Insufficient Funds - Number"]?.[transaction.account.iin as Iin] ??
					0) + 1
		return result
	}
	export function cards(
		previous: NonMonthly,
		cards: Card[],
		range: { start: isoly.Date; end: isoly.Date }
	): NonMonthly {
		const result = previous
		for (const iin of Iin.values) {
			const iinCards = cards.filter(card => card.details.iin == iin)
			const iinCardsWithinRange = iinCards.filter(card => card.created >= range.start && card.created < range.end)
			result["Total Number of Cards"][iin] = iinCardsWithinRange.length
			result["Total Number of Active Cards"][iin] = iinCards.filter(
				card =>
					card.history.some(history => history.status == "cancelled" && history.created >= range.end) ||
					!card.history.some(history => history.status == "cancelled")
			).length
			result["Total Number of Active Accounts"][iin] = new Set(iinCards.map(card => card.account)).size
			result["Total Number of Accounts"][iin] = new Set(
				iinCards.filter(card => card.status == "active").map(card => card.account)
			).size
		}
		return result
	}
	export function toCsvRow(data: NonMonthly, row: rows.NonZero): string {
		let result = row
		for (const iin of Iin.values)
			result += `|${data[row as keyof NonMonthly][iin] ?? 0}`
		result += "\n"
		return result
	}
	export function merge(previous: NonMonthly, addition: NonMonthly): NonMonthly {
		const result: NonMonthly = empty()
		for (const key of Object.keys(result) as (keyof NonMonthly)[])
			for (const iin of Iin.values)
				result[key][iin] = (previous[key]?.[iin] ?? 0) + (addition[key]?.[iin] ?? 0)
		return result
	}
}
