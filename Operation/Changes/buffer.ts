import type { Changes } from "./index"

export function buffer(amount: number): Changes {
	return {
		["reserved-buffer"]: {
			type: amount >= 0 ? "add" : "subtract",
			amount: Math.abs(amount),
			status: "pending",
		},
		available: {
			type: amount >= 0 ? "subtract" : "add",
			amount: Math.abs(amount),
			status: "pending",
		},
	}
}
