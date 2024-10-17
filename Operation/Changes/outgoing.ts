import { isoly } from "isoly"
import type { Rule } from "../../Rule"
import { Settlement } from "../../Settlement"
import { Transaction } from "../../Transaction"
import type { Changes } from "./index"
import { sum } from "./sum"

export namespace outgoing {
	export function initiate(state: Rule.State.Evaluated): Changes {
		return {
			["reserved-outgoing"]: { type: "add", amount: state.transaction.original.total, status: "pending" },
			available: {
				type: "subtract",
				amount: state.transaction.original.total ?? state.transaction.original.total,
				status: "pending",
			},
		}
	}
	export function finalize(state: Rule.State.Evaluated, transaction: Transaction, counterbalance: string): Changes {
		const summed = sum(transaction.operations)
		const available = isoly.Currency.subtract(
			state.transaction.original.currency,
			summed["reserved-outgoing"] ?? 0,
			isoly.Currency.add(
				state.transaction.original.currency,
				state.transaction.original.charge?.current ?? 0,
				state.transaction.original.amount
			)
		)
		return {
			["reserved-outgoing"]: { type: "subtract", amount: summed["reserved-outgoing"] ?? 0, status: "pending" },
			[counterbalance]: {
				type: "add" as const,
				amount: isoly.Currency.subtract(
					state.transaction.original.currency,
					state.transaction.original.amount,
					state.transaction.original.charge?.current ?? 0
				),
				status: "pending" as const,
			},
			...(available != 0 && {
				available: { type: available > 0 ? "add" : "subtract", amount: Math.abs(available), status: "pending" },
			}),
			...(state.transaction.original.charge?.current && {
				[`${isoly.DateTime.truncate(isoly.DateTime.now(), "hours")}-charge`]: {
					type: "add" as const,
					amount: state.transaction.original.charge?.current ?? 0,
					status: "pending" as const,
				},
			}),
		}
	}
	export function capture(
		state: Rule.State.Evaluated,
		transaction: Transaction,
		entry: Settlement.Entry.Capture.Creatable,
		settlement: string
	): Changes {
		const summed = sum(transaction.operations)
		const available = -isoly.Currency.add(
			state.transaction.original.currency,
			summed.available ?? 0,
			isoly.Currency.add(
				state.transaction.original.currency,
				state.transaction.original.charge?.current ?? 0,
				isoly.Currency.add(
					state.transaction.original.currency,
					entry.fee.other[state.transaction.original.currency] ?? 0,
					entry.amount[1] ?? 0
				)
			)
		)
		const charge =
			state.transaction.original.charge?.current != 0 ? state.transaction.original.charge?.current : undefined
		return {
			...(available != 0 && {
				available: { type: available > 0 ? "add" : "subtract", amount: Math.abs(available), status: "pending" },
			}),
			["reserved-outgoing"]: { type: "subtract", amount: summed["reserved-outgoing"] ?? 0, status: "pending" },
			[`${settlement}-net`]: { type: "add" as const, amount: entry.amount[1], status: "pending" as const },
			[`${settlement}-fee`]: {
				type: "add" as const,
				amount: entry.fee.other[entry.amount[0]] ?? 0,
				status: "pending" as const,
			},
			...(charge && {
				[`${settlement}-charge`]: { type: "add" as const, amount: charge, status: "pending" as const },
			}),
		}
	}
	export function refund(
		state: Rule.State.Evaluated,
		transaction: Transaction,
		entry: Settlement.Entry.Refund.Creatable,
		settlement: string
	): Changes {
		const summed = sum(transaction.operations)
		console.log(entry)
		const currency = entry.amount[0]
		const fee = entry.fee.other[currency] ?? 0
		const net = entry.amount[1]
		const available = isoly.Currency.subtract(
			currency,
			isoly.Currency.add(currency, fee, net),
			state.transaction.original.charge?.current ?? 0
		)
		return {
			available: { type: available > 0 ? "add" : "subtract", amount: Math.abs(available), status: "pending" },
			["reserved-incoming"]: {
				type: "subtract",
				amount: summed["reserved-incoming"] ?? 0,
				status: "pending",
			},
			[`${settlement}-net`]: { type: "subtract" as const, amount: net, status: "pending" as const },
			[`${settlement}-fee`]: { type: "subtract" as const, amount: fee, status: "pending" as const },
			...(state.transaction.original.charge?.current && {
				[`${settlement}-charge`]: {
					type: "add" as const,
					amount: state.transaction.original.charge.current,
					status: "pending" as const,
				},
			}),
		}
	}
	export function fund(transaction: Transaction.Creatable, reference: string): Changes {
		return {
			available: { type: "add", amount: transaction.amount, status: "pending" },
			[`${reference}-${isoly.DateTime.truncate(isoly.DateTime.now(), "hours")}`]: {
				type: "subtract" as const,
				amount: transaction.amount,
				status: "pending" as const,
			},
		}
	}
}
