import { isoly } from "isoly"
import { isly } from "isly"
import { Holidays } from "../../../Holidays"
import { Account } from "../../Account"
import { Transaction } from "../../Transaction"

export interface Unguarded {
	type: "unguarded"
	date: isoly.Date
	currency: isoly.Currency
	transaction: { id: string; created: isoly.DateTime }
}
export namespace Unguarded {
	export const type = isly.object<Unguarded>({
		type: isly.string("unguarded"),
		date: isly.string(),
		currency: isly.string(),
		transaction: isly.object<Unguarded["transaction"]>({ id: isly.string(), created: isly.string() }),
	})
	export function create(account: Account, transactions: Transaction[]): Unguarded[] {
		const result: Unguarded[] = []
		for (const [currency, amount] of Object.entries(account.balance)) {
			let oldest: { id: string; date: isoly.Date; created: isoly.DateTime } | undefined = undefined
			let remainder = amount
			for (const transaction of transactions) {
				if (transaction.amount > 0 && transaction.currency == currency && remainder > 0) {
					remainder = isoly.Currency.subtract(currency, remainder, transaction.amount)
					oldest = {
						id: transaction.id,
						date: isoly.DateTime.getDate(transaction.created),
						created: transaction.created,
					}
				} else if (remainder < 0)
					break
			}
			if (oldest && isoly.Date.now() > isoly.Date.nextBusinessDay(oldest.date, 3, Holidays.dates["England"]))
				result.push({
					type: "unguarded",
					currency: currency as isoly.Currency,
					date: oldest.date,
					transaction: { id: oldest.id, created: oldest.created },
				})
		}
		return result
	}
}
