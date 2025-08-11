import { isoly } from "isoly"
import { isly } from "isly"
import type { Rule } from "../Rule"
import { Exchange } from "./Exchange"

export interface Amount {
	exchange?: Exchange
	reserved: {
		subtotal: number
		charge?: { charges: Charge[]; total: number }
		total: number
	}
	processed: {
		events: Event[]
		subtotal: number
		charge?: { charges: Charge[]; total: number }
		total: number
	}
}
export interface Event {
	id: string
	timestamp: isoly.DateTime
	subtotal: number
	charge?: {
		exchange: number
		total: number
	}
	total: number
}
export interface Charge {
	type: "exchange" | "merchant markup"
	description?: string
	amount: number
}

export namespace Amount {
	export const type = isly.object<Amount>({
		original: isly.number(),
		charge: isly.number(),
		total: isly.number(),
		exchange: Exchange.type.optional(),
	})
	export function fromState(state: Rule.State): Amount {
		const sign = ["outbound", "authorization", "capture"].some(direction => direction == state.transaction.kind)
			? -1
			: 1
		return {
			original: sign * state.transaction.original.amount,
			charge: sign * (state.transaction.original.charge?.total ?? 0),
			total: sign * state.transaction.original.total,
			exchange: state?.transaction.exchange ?? state.authorization?.exchange,
		}
	}

	export function change(
		currency: isoly.Currency,
		amount: Amount,
		change: number,
		type: Exclude<keyof Amount, "total" | "exchange">
	): Amount {
		amount[type] = isoly.Currency.add(currency, amount[type], change)
		amount.total = isoly.Currency.add(currency, amount.total, change)
		return amount
	}
}
