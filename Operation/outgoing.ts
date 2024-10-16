import type { Rule } from "../Rule"
import { Settlement } from "../Settlement"
import type { Transaction } from "../Transaction"
import { Changes } from "./Changes"
import { create } from "./create"
import type { Operation } from "./index"

export namespace outgoing {
	export function initiate(transaction: string, state: Rule.State.Evaluated): Operation {
		return {
			...create(transaction, state.transaction.kind == "authorization" ? "authorization" : "outgoing", state),
			changes: Changes.outgoing.initiate(state),
		}
	}
	export function finalize(transaction: Transaction, state: Rule.State.Evaluated, counterbalance: string): Operation {
		return {
			...create(transaction.id, "finalizeOutgoing", state),
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
			...create(transaction.id, "capture", state),
			changes: Changes.outgoing.capture(state, transaction, capture, settlement),
		}
	}
}
