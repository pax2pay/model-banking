import { isoly } from "isoly"
import type { Rule } from "../../Rule"
import { Transaction } from "../../Transaction"
import type { Changes } from "./index"
import { sum } from "./sum"

export namespace incoming {
	export function initiate(counterpart: string, state: Rule.State.Evaluated): Changes {
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
	export function finalize(transaction: Transaction, state?: Rule.State.Evaluated): Changes {
		const summed = sum(transaction.operations)
		return {
			available: {
				type: "add",
				amount: isoly.Currency.subtract(
					transaction.currency,
					transaction.amount.original,
					state?.transaction.original.charge?.current ?? 0
				),
				status: "pending",
			},
			["reserved-incoming"]: { type: "subtract", amount: summed["reserved-incoming"] ?? 0, status: "pending" },
			...(state?.transaction.original.charge?.current && {
				[`${isoly.DateTime.truncate(isoly.DateTime.now(), "hours")}-charge`]: {
					type: "add" as const,
					amount: state.transaction.original.charge?.current ?? 0,
					status: "pending" as const,
				},
			}),
		}
	}
	export function collect(transaction: Transaction.Creatable, counterbalance: string): Changes {
		return {
			available: { amount: transaction.amount, type: "add" as const, status: "pending" as const },
			[`${counterbalance}`]: {
				amount: transaction.amount,
				type: "subtract" as const,
				status: "pending" as const,
			},
		}
	}
}
