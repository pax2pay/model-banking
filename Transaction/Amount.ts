import { isoly } from "isoly"
import { isly } from "isly"
import type { Rule } from "../Rule"
import { Exchange } from "./Exchange"

export interface Amount {
	original: number
	charge?: { merchant?: number; exchange?: number }
	total: number
	exchange?: Exchange
}
export namespace Amount {
	export const type = isly.object<Amount>({
		original: isly.number(),
		charge: isly.object({ merchant: isly.number().optional(), exchange: isly.number().optional() }),
		total: isly.number(),
		exchange: Exchange.type.optional(),
	})
	export function fromState(state: Rule.State): Amount {
		const sign = ["outbound", "authorization", "capture"].some(direction => direction == state.transaction.kind)
			? -1
			: 1
		return {
			original: sign * state.transaction.original.amount,
			total: sign * state.transaction.original.total,
			exchange: state?.transaction.exchange ?? state.authorization?.exchange,
		}
	}
	export function change(
		currency: isoly.Currency,
		amount: Amount,
		change: number,
		type: Exclude<keyof Amount, "total" | "exchange" | "charge">
	): Amount {
		amount[type] = isoly.Currency.add(currency, amount[type], change)
		amount.total = isoly.Currency.add(currency, amount.total, change)
		return amount
	}
}
