import type { Rule } from "../Rule"
import { Changes } from "./Changes"
import { create } from "./create"
import type { Operation } from "./index"

export function fund(transaction: string, state: Rule.State.Evaluated, reference: string): Operation {
	return {
		...create(transaction, "fund", state),
		changes: Changes.outgoing.fund(state, reference),
	}
}
