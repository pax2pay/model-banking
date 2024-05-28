import { isoly } from "isoly"
import { isly } from "isly"
import { Amounts } from "../../Amounts"
import { Transaction } from "../Transaction"

export namespace Credit {
	export type Balances = Partial<Record<isoly.Currency, { cursor: string; amount: number; timestamp: isoly.DateTime }>>
	export namespace Balances {
		export const type = isly.record<Balances>(
			isly.fromIs("isoly.Currency", isoly.Currency.is),
			isly.object<Required<Balances>[isoly.Currency]>({
				cursor: isly.string(),
				amount: isly.number(),
				timestamp: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
			})
		)
	}
	export function settleBalances(transactions: Transaction[], balances: Balances): Balances {
		for (let i = transactions.length - 1; i >= 0; i--) {
			const transaction = transactions[i]
			const balance = balances[transaction.currency]
			//Shouldn't happen
			if (!balance)
				balances[transaction.currency] = {
					cursor: transaction.id,
					amount: -transaction.amount,
					timestamp: transaction.created,
				}
			else if (balance.amount > 0) {
				balance.amount -= transaction.amount
				balance.cursor = transaction.id
				balance.timestamp = transaction.created
				balances[transaction.currency] = balance
			}
		}
		return balances
	}
	export function updateBalances(amounts: Amounts, balances?: Balances): Balances {
		return Object.entries(amounts).reduce((result, [currency, amount]: [isoly.Currency, number]) => {
			let balance = result[currency]
			!balance ? (balance = { cursor: "", amount, timestamp: isoly.DateTime.now() }) : (balance.amount += amount)
			result[currency] = balance
			return result
		}, balances ?? {})
	}
	export function isStale(
		balance: Required<Balances>[isoly.Currency],
		bankingDays?: number,
		holidays?: isoly.Date[]
	): boolean {
		return (
			isoly.Date.now() > isoly.Date.nextBusinessDay(isoly.DateTime.getDate(balance.timestamp), bankingDays, holidays)
		)
	}
}
