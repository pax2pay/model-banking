import type { Rule } from "../../Rule"
import type { Changes } from "./index"

export function buffer(state: Rule.State.Evaluated): Changes {
	return {
		["reserved-buffer"]: {
			type: state.transaction.original.total >= 0 ? "add" : "subtract",
			amount: Math.abs(state.transaction.original.total),
			status: "pending",
		},
		available: {
			type: state.transaction.original.total >= 0 ? "subtract" : "add",
			amount: Math.abs(state.transaction.original.total),
			status: "pending",
		},
	}
}
