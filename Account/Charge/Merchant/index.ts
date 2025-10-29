import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../../../Card"
import { Rail } from "../../../Rail"
import { Amount } from "../../../Transaction/Amount"
import { Preset } from "../Preset"

export interface Merchant {
	destination: { account: string }
	merchants: Partial<Record<Card.Restriction.Merchant, Preset>>
}
export namespace Merchant {
	export const type = isly.object<Merchant>({
		destination: isly.object({
			account: isly.string(),
		}),
		merchants: isly.record<Card.Restriction.Merchant, Preset>(Card.Restriction.Merchant.type, Preset.type),
	})

	export function evaluate(
		charge: Merchant,
		currency: isoly.Currency,
		amount: number,
		counterpart: Rail.Address.Card.Counterpart,
		preset?: Card.Preset
	): Amount.Charge.Merchant | undefined {
		let result: Amount.Charge.Merchant | undefined
		const merchant = Card.Restriction.Merchant.resolve(counterpart)
		if (merchant) {
			const chargePreset = preset && charge.merchants?.[merchant]?.[preset] ? preset : "default"
			const chargeRate = charge.merchants?.[merchant]?.[chargePreset] ?? 0
			result = {
				merchant,
				preset: chargePreset,
				destination: charge.destination,
				rate: chargeRate,
				amount: -isoly.Currency.multiply(currency, amount, chargeRate),
			}
		}
		return result
	}
}
