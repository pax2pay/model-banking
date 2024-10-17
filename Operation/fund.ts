import type { Transaction } from "../Transaction"
import { Changes } from "./Changes"
import { create } from "./create"
import type { Operation } from "./index"

export function fund(
	transaction: string,
	creatable: Transaction.Creatable,
	account: string,
	reference: string
): Operation {
	return {
		...create(transaction, creatable.currency, account, "fund"),
		changes: Changes.outgoing.fund(creatable, reference),
	}
}
