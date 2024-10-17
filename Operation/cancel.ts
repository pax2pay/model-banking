import type { Rule } from "../Rule"
import type { Transaction } from "../Transaction"
import { Changes } from "./Changes"
import { create } from "./create"
import type { Operation } from "./index"

export function cancel(transaction: Transaction, state: Rule.State.Evaluated): Operation {
	return {
		...create(transaction.id, "collect", state),
		changes: Changes.cancel(transaction),
	}
}
