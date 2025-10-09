import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"
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
		creatable: Transaction.Creatable.CardTransaction,
		preset: Card.Preset
	): Transaction.Amount.Charge[] {
		const result: Transaction.Amount.Charge[] = []
		for (const charge of charges) {
			const chargeThisPreset =
				!charge.applies.to.presets ||
				charge.applies.to.presets.length === 0 ||
				charge.applies.to.presets?.includes(preset)
			const chargeResult = {
				destination: charge.destination,
				amount: -isoly.Currency.multiply(creatable.currency, creatable.amount, charge.rate),
			}
			if (
				chargeThisPreset &&
				charge.applies.to.merchants?.some(merchant => Card.Restriction.Merchant.check(merchant, creatable.counterpart))
			)
				result.push({
					...chargeResult,
					type: "merchant",
				})
			if (chargeThisPreset && charge.applies.to.fx && creatable.exchange)
				result.push({
					...chargeResult,
					type: "exchange",
				})
		}
		return result
	}
	export function sum(charges: Transaction.Amount.Charge[], currency: isoly.Currency): number {
		return charges.reduce((sum, charge) => isoly.Currency.add(currency, sum, charge.amount), 0)
	}
}
