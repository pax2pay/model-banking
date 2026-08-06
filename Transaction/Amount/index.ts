import { isoly } from "isoly"
import { isly } from "isly"
import { Exchange } from "../Exchange"
import { Charge as AmountCharge } from "./Charge"

export interface Amount {
	original: number
	charge: number //Legacy
	charges?: Amount.Charge
	total: number
	exchange?: Exchange
}
export namespace Amount {
	export import Charge = AmountCharge
	export const type = isly.object<Amount>({
		original: isly.number(),
		charge: isly.number(),
		charges: Amount.Charge.type.optional(),
		total: isly.number(),
		exchange: Exchange.type.optional(),
	})
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
