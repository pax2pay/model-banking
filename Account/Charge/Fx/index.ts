import { isoly } from "isoly"
import { Card } from "../../../Card"
import { Transaction } from "../../../Transaction"
import { Preset } from "../Preset"

export type Fx = Preset

export namespace Fx {
	export const type = Preset.type
	export function evaluate(
		charge: Fx,
		currency: isoly.Currency,
		amount: number,
		preset: Card.Preset,
		exchange?: Transaction.Exchange
	): Transaction.Amount.Charge.Fx | undefined {
		let result: number | undefined = undefined
		if (exchange) {
			const rate = charge[preset] ? { [preset]: charge[preset] } : { default: charge.default }
			rate && (result = -isoly.Currency.multiply(currency, amount, Object.values(rate)[0]))
		}
		return result
			? {
					...charge,
					amount: result,
			  }
			: undefined
	}
}
