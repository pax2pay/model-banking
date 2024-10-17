import type { Rule } from "../Rule"
import { Changes } from "./Changes"
import { create } from "./create"
import type { Operation } from "./index"

export function collect(transaction: string, state: Rule.State.Evaluated, counterpart: string): Operation {
	return {
		...create(transaction, "collect", state),
		changes: Changes.incoming.collect(state, counterpart),
	}
}
