import type { Rule } from "../Rule"
import { Transaction } from "../Transaction"
import { Changes } from "./Changes"
import { create } from "./create"
import type { Operation } from "./index"

export namespace incoming {
	export function initiate(transaction: string, state: Rule.State.Evaluated, counterpart: string): Operation {
		return {
			...create(transaction, state.transaction.original.currency, state.account.id, "incoming"),
			changes: Changes.incoming.initiate(counterpart, state),
		}
	}
	export function finalize(transaction: Transaction, account: string, state?: Rule.State.Evaluated): Operation {
		return {
			...create(transaction.id, transaction.currency, account, "finalizeIncoming"),
			changes: Changes.incoming.finalize(transaction, state),
		}
	}
}
