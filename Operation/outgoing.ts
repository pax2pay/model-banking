import type { Rule } from "../Rule"
import { Settlement } from "../Settlement"
import type { Transaction } from "../Transaction"
import { Changes } from "./Changes"
import { create } from "./create"
import type { Operation } from "./index"

export namespace outgoing {
	export function initiate(transaction: string, state: Rule.State.Evaluated): Operation {
		return {
			...create(
				transaction,
				state.transaction.original.currency,
				state.account.id,
				state.transaction.kind == "authorization" ? "authorization" : "outgoing"
			),
			changes: Changes.outgoing.initiate(state),
		}
	}
	export function finalize(transaction: Transaction, state: Rule.State.Evaluated, counterbalance: string): Operation {
		return {
			...create(transaction.id, transaction.currency, state.account.id, "finalizeOutgoing"),
			changes: Changes.outgoing.finalize(state, transaction, counterbalance),
		}
	}
	export function capture(
		transaction: Transaction,
		state: Rule.State.Evaluated,
		capture: Settlement.Entry.Capture.Creatable,
		settlement: string
	): Operation {
		return {
			...create(transaction.id, transaction.currency, state.account.id, "capture"),
			changes: Changes.outgoing.capture(state, transaction, capture, settlement),
		}
	}
}
