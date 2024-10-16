import type { Rule } from "../Rule"
import { Transaction } from "../Transaction"
import { Changes } from "./Changes"
import { create } from "./create"
import type { Operation } from "./index"

export namespace incoming {
	export function initiate(transaction: string, state: Rule.State.Evaluated, counterpart: string): Operation {
		return { ...create(transaction, "incoming", state), changes: Changes.incoming.initiate(state, counterpart) }
	}
	export function finalize(transaction: Transaction, state: Rule.State.Evaluated): Operation {
		return {
			...create(transaction.id, "finalizeIncoming", state),
			changes: Changes.incoming.finalize(state, transaction),
		}
	}
	export function collect(transaction: string, state: Rule.State.Evaluated, counterpart: string): Operation {
		return {
			...create(transaction, "collect", state),
			changes: Changes.incoming.collect(state, counterpart),
		}
	}
	export function fund(transaction: string, state: Rule.State.Evaluated, reference: string): Operation {
		return {
			...create(transaction, "fund", state),
			changes: Changes.outgoing.fund(state, reference),
		}
	}
}
