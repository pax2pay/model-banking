import type { Rule } from "../Rule"
import type { Transaction } from "../Transaction"
import { Changes } from "./Changes"
import { create } from "./create"
import type { Operation } from "./index"

export function buffer(transaction: Transaction, state: Rule.State.Evaluated): Operation {
	return {
		...create(transaction.id, "adjustBuffer", state),
		changes: Changes.buffer(state),
	}
}
