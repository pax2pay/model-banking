import type { Transaction } from "../Transaction"
import { Changes } from "./Changes"
import { create } from "./create"
import type { Operation } from "./index"

export function cancel(transaction: Transaction): Operation {
	return {
		...create(transaction.id, transaction.currency, transaction.accountId, "collect"),
		changes: Changes.cancel(transaction),
	}
}
