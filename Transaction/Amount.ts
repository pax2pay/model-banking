import { isoly } from "isoly"
import { isly } from "isly"
import { Charge as AccountCharge } from "../Account/Charge"
import type { Rule } from "../Rule"
import { Exchange } from "./Exchange"

export interface Amount {
	original: number
	charge: number //Legacy
	charges?: Amount.Charge
	total: number
	exchange?: Exchange
}
export namespace Amount {
	export interface Charge {
		amount: number
		charge: AccountCharge
	}
	export namespace Charge {
		export interface Fx extends AccountCharge.Fx {
			amount: number
		}
		export interface Merchant extends AccountCharge.Merchant {
			amount: number
		}
		export const type = isly.object<Charge>({
			amount: isly.number(),
			charge: AccountCharge.type,
		})
	}
	export const type = isly.object<Amount>({
		original: isly.number(),
		charge: isly.number(),
		charges: Amount.Charge.type.optional(),
		total: isly.number(),
		exchange: Exchange.type.optional(),
	})
	export function fromState(state: Rule.State, charges?: Charge): Amount {
		const sign = ["outbound", "authorization", "capture"].some(direction => direction == state.transaction.kind)
			? -1
			: 1
		return {
			original: sign * state.transaction.original.amount,
			charge: 0,
			charges,
			total: isoly.Currency.add(
				state.transaction.original.currency,
				sign * state.transaction.original.total,
				charges?.amount ?? 0
			),
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
