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
		let result: Amount.Charge.Fx | undefined
		const chargePreset = preset && charge[preset] ? preset : "default"
		const chargeRate = charge[chargePreset] ?? 0
		if (exchange)
			result = {
				preset: chargePreset,
				rate: chargeRate,
				amount: -isoly.Currency.multiply(currency, amount, chargeRate),
			}
		return result
	}
}
