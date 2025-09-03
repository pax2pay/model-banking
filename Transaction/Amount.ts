import { isoly } from "isoly"
import { isly } from "isly"
import type { Rule } from "../Rule"
import { Exchange } from "./Exchange"

export interface Amount {
	original: number
	charge?: number //Legacy
	charges?: Amount.Charge[]
	total: number
	exchange?: Exchange
}
export namespace Amount {
	export interface Charge {
		amount: number
		type: "merchant" | "exchange"
		destination: { account: string }
	}
	export namespace Charge {
		export const type = isly.object<Charge>({
			amount: isly.number(),
			type: isly.string(["merchant", "exchange"]),
			destination: isly.object({ account: isly.string() }),
		})
		export function total(currency: isoly.Currency, charges: Charge[] = []): number {
			return charges.reduce((r, c) => isoly.Currency.add(currency, r, c.amount), 0)
		}
	}
	export const type = isly.object<Amount>({
		original: isly.number(),
		charge: isly.number().optional(),
		charges: Charge.type.array().optional(),
		total: isly.number(),
		exchange: Exchange.type.optional(),
	})
	export function fromState(state: Rule.State): Amount {
		const sign = ["outbound", "authorization", "capture"].some(direction => direction == state.transaction.kind)
			? -1
			: 1
		return {
			original: sign * state.transaction.original.amount,
			charges: state.transaction.original.charges,
			total: sign * state.transaction.original.total,
			exchange: state?.transaction.exchange ?? state.authorization?.exchange,
		}
	}
	export function change(
		currency: isoly.Currency,
		amount: Amount,
		change: number,
		type: Exclude<keyof Amount, "total" | "exchange" | "charges">
	): Amount {
		amount[type] = isoly.Currency.add(currency, amount[type] ?? 0, change)
		amount.total = isoly.Currency.add(currency, amount.total, change)
		return amount
	}
}
