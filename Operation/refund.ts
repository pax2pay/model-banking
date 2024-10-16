import type { Rule } from "../Rule"
import { Settlement } from "../Settlement"
import type { Transaction } from "../Transaction"
import { Changes } from "./Changes"
import { create } from "./create"
import type { Operation } from "./index"

export namespace refund {
	export function initiate(
		transaction: string,
		state: Rule.State.Evaluated,
		refund: Settlement.Entry.Refund.Creatable,
		settlement: string
	): Operation {
		return {
			...create(transaction, "refund", state),
			changes: Changes.refund.initiate(refund, settlement),
		}
	}
	export function finalize(
		transaction: Transaction,
		state: Rule.State.Evaluated,
		refund: Settlement.Entry.Refund.Creatable,
		settlement: string
	): Operation {
		return {
			...create(transaction.id, "refund", state),
			changes: Changes.refund.finalize(state, transaction, refund, settlement),
		}
	}
}
