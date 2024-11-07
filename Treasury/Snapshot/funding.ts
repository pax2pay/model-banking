import { isoly } from "isoly"
import { isly } from "isly"
import { Transaction } from "../Transaction"

export namespace funding {
	export type Cursor = { cursor: string; amount: number }
	export namespace Cursor {
		export const type = isly.object<Cursor>({
			cursor: isly.string(),
			amount: isly.number(),
		})
		export function fromTransaction(transaction: Transaction): string {
			return `${transaction.currency}|${isoly.DateTime.invert(transaction.created)}|${transaction.id}`
		}
		export function toTimestamp(cursor: string): isoly.DateTime {
			return isoly.DateTime.invert(cursor.split("|")[1])
		}
	}
	export type Cursors = Partial<Record<isoly.Currency, Cursor>>
	export namespace Cursors {
		export const type = isly.record<Cursors>(isly.fromIs("isoly.Currency", isoly.Currency.is), Cursor.type)
		export function updateAmount(settlement: Transaction, cursors: Cursors): Cursors {
			const cursor = cursors[settlement.currency]
			if (!cursor)
				cursors[settlement.currency] = {
					cursor: Cursor.fromTransaction(settlement),
					amount: Math.abs(settlement.amount),
				}
			else
				cursor.amount += Math.abs(settlement.amount)
			return cursors
		}
		export function updateCursors(funding: Transaction, cursors: Cursors): Cursors {
			const cursor = cursors[funding.currency]
			if (!cursor)
				cursors[funding.currency] = {
					cursor: Cursor.fromTransaction(funding),
					amount: -Math.abs(funding.amount),
				}
			else if (cursor.amount > 0) {
				cursor.amount -= Math.abs(funding.amount)
				cursor.cursor = Cursor.fromTransaction(funding)
			}
			return cursors
		}
	}
	export function settle(transactions: Transaction[], amountsUpdated: Cursors): Cursors {
		for (let i = transactions.length - 1; i >= 0; i--)
			Cursors.updateCursors(transactions[i], amountsUpdated)
		return amountsUpdated
	}
	export function isStale(cursor: Cursor, bankingDays?: number, holidays?: isoly.Date[]): boolean {
		return (
			isoly.Date.now() >
			isoly.Date.nextBusinessDay(isoly.DateTime.getDate(Cursor.toTimestamp(cursor.cursor)), bankingDays, holidays)
		)
	}
}
