import { isoly } from "isoly"
import type { Rule } from "../../Rule"
import { Settlement } from "../../Settlement"
import { Transaction } from "../../Transaction"
import type { Changes } from "./index"
import { sum } from "./sum"

export namespace refund {
	export function initiate(entry: Settlement.Entry.Refund.Creatable, settlement: string): Changes {
		// The Entry.Refund.Creatable has negative amount and fee
		// The operation amounts should always be positive
		const [currency, amount] = entry.amount
		const net = Math.abs(amount)
		const fee = Math.abs(entry.fee.other[currency] ?? 0)
		return {
			"reserved-incoming": {
				type: "add",
				amount: isoly.Currency.add(currency, net, fee),
				status: "pending",
			},
			[`${settlement}-net`]: {
				type: "subtract" as const,
				amount: net,
				status: "pending" as const,
			},
			[`${settlement}-fee`]: {
				type: "subtract" as const,
				amount: fee,
				status: "pending" as const,
			},
		}
	}
	export function finalize(
		state: Rule.State.Evaluated,
		transaction: Transaction,
		entry: Settlement.Entry.Refund.Creatable,
		settlement: string
	): Changes {
		const summed = sum(transaction.operations)
		const currency = entry.amount[0]
		const fee = Math.abs(entry.fee.other[currency] ?? 0)
		const net = Math.abs(entry.amount[1])
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
			...(state.transaction.original.charge?.current && {
				[`${settlement}-charge`]: {
					type: "add" as const,
					amount: state.transaction.original.charge.current,
					status: "pending" as const,
				},
			}),
		}
	}
}
