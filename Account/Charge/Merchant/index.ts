import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../../../Card"
import { Rail } from "../../../Rail"
import { Transaction } from "../../../Transaction"
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
		preset: Card.Preset
	): Transaction.Amount.Charge.Merchant | undefined {
		let result: number | undefined = undefined
		const merchant = Card.Restriction.Merchant.resolve(counterpart)
		if (merchant) {
			const rate = charge.merchants?.[merchant]?.[preset] ?? charge.merchants?.[merchant]?.default
			rate && (result = -isoly.Currency.multiply(currency, amount, rate))
		}
		return result
			? {
					...charge,
					amount: result,
			  }
			: undefined
	}
}
