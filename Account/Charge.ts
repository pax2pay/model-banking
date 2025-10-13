import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"
import { Rail } from "../Rail"
import { Transaction } from "../Transaction"

export interface Charge extends Charge.Creatable {
	id: string
}
export namespace Charge {
	export interface Creatable {
		destination: { account: string }
		rate: number // rate: 0.01 for 1%
		applies: {
			to: {
				presets?: Card.Preset[]
				merchants?: Card.Restriction.Merchant[]
				fx?: boolean
			}
		}
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			destination: isly.object({ account: isly.string() }),
			rate: isly.number(),
			applies: isly.object({
				to: isly.object<Creatable["applies"]["to"]>({
					presets: Card.Preset.type.array().optional(),
					merchants: Card.Restriction.Merchant.type.array().optional(),
					fx: isly.boolean().optional(),
				}),
			}),
		})
	}
	export const type = Creatable.type.extend<Charge>({
		id: isly.string(),
	})
	export function fromCreatable(creatable: Creatable): Charge {
		return { ...creatable, id: cryptly.Identifier.generate(4) }
	}
	export function evaluate(
		charges: Charge[] = [],
		counterpart: Rail.Address.Card.Counterpart,
		currency: isoly.Currency,
		amount: number,
		preset?: Card.Preset,
		exchange?: Transaction.Exchange
	): Transaction.Amount.Charge[] {
		const result: Transaction.Amount.Charge[] = []
		for (const charge of charges) {
			const chargeThisPreset =
				!charge.applies.to.presets ||
				charge.applies.to.presets.length === 0 ||
				!preset ||
				charge.applies.to.presets?.includes(preset)
			const chargeBase = {
				destination: charge.destination,
				amount: -isoly.Currency.multiply(currency, amount, charge.rate),
			}
			if (
				chargeThisPreset &&
				charge.applies.to.merchants?.some(merchant => Card.Restriction.Merchant.check(merchant, counterpart))
			)
				result.push({ ...chargeBase, type: "merchant" })
			if (chargeThisPreset && charge.applies.to.fx && exchange)
				result.push({ ...chargeBase, type: "exchange" })
		}
		return result
	}
	export function sum(charges: Transaction.Amount.Charge[], currency: isoly.Currency): number {
		return charges.reduce((sum, charge) => isoly.Currency.add(currency, sum, charge.amount), 0)
	}
}
