import { isoly } from "isoly"
import type { Rule } from "../../Rule"
import { Transaction } from "../../Transaction"
import type { Changes } from "./index"
import { sum } from "./sum"

export namespace incoming {
	export function initiate(state: Rule.State.Evaluated, counterpart: string): Changes {
		return {
			["reserved-incoming"]: {
				type: "add" as const,
				amount: state.transaction.original.total,
				status: "pending" as const,
			},
			[counterpart]: {
				type: "subtract" as const,
				amount: state.transaction.original.total,
				status: "pending" as const,
			},
		}
	}
	export function finalize(state: Rule.State.Evaluated, transaction: Transaction): Changes {
		const summed = sum(transaction.operations)
		return {
			available: {
				type: "add",
				amount: isoly.Currency.subtract(
					state.transaction.original.currency,
					state.transaction.original.amount,
					state.transaction.original.charge?.current ?? 0
				),
				status: "pending",
			},
			["reserved-incoming"]: { type: "subtract", amount: summed["reserved-incoming"] ?? 0, status: "pending" },
			...(state.transaction.original.charge?.current && {
				[`${isoly.DateTime.truncate(isoly.DateTime.now(), "hours")}-charge`]: {
					type: "add" as const,
					amount: state.transaction.original.charge?.current ?? 0,
					status: "pending" as const,
				},
			}),
		}
	}
	export function collect(state: Rule.State.Evaluated, counterpart: string): Changes {
		return {
			available: { amount: state.transaction.original.total, type: "add" as const, status: "pending" as const },
			[`${counterpart}`]: {
				amount: state.transaction.original.total,
				type: "subtract" as const,
				status: "pending" as const,
			},
		}
	}
}
