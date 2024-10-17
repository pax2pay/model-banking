import { isoly } from "isoly"
import { Changes } from "./Changes"
import { create } from "./create"
import type { Operation } from "./index"

export function buffer(transaction: string, currency: isoly.Currency, amount: number, account: string): Operation {
	return {
		...create(transaction, currency, account, "adjustBuffer"),
		changes: Changes.buffer(amount),
	}
}
