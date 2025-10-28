import { isoly } from "isoly"
import { Card } from "../../../Card"
import { Amount } from "../../../Transaction/Amount"
import { Exchange } from "../../../Transaction/Exchange"
import { Preset } from "../Preset"

export type Fx = Preset

export namespace Fx {
	export const type = Preset.type
	export function evaluate(
		charge: Fx,
		currency: isoly.Currency,
		amount: number,
		preset?: Card.Preset,
		exchange?: Exchange
	): Amount.Charge.Fx | undefined {
		const result: Partial<Amount.Charge.Fx> = {}
		if (exchange) {
			result.preset = preset && charge[preset] ? preset : "default"
			result.rate = charge[result.preset]
			result.rate && (result.amount = -isoly.Currency.multiply(currency, amount, result.rate))
		}
		return Amount.Charge.Fx.type.is(result) ? result : undefined
	}
}
