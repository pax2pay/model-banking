import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"
import type { Rail } from "../Rail"
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
				merchants: Card.Restriction.Merchant[]
			}
		}
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			destination: isly.object({ account: isly.string() }),
			rate: isly.number(),
			applies: isly.object({
				to: isly.object<Creatable["applies"]["to"]>({
					merchants: Card.Restriction.Merchant.type.array(),
				}),
			}),
		})
	}
	export const type = Creatable.type.extend<Charge>({
		id: isly.string(),
	})
	export function fromCreatable(creatable: Creatable): Charge {
		return { ...creatable, id: cryptly.Identifier.generate(16) }
	}
	export function evaluate(
		charges: Charge[] = [],
		counterpart: Rail.Address.Card.Counterpart,
		currency: isoly.Currency,
		amount: number
	): Transaction.Amount.Charge[] {
		const result: Transaction.Amount.Charge[] = []
		for (const charge of charges)
			if (charge.applies.to.merchants.some(merchant => Card.Restriction.Merchant.check(merchant, counterpart)))
				result.push({
					destination: charge.destination,
					type: "merchant",
					amount: -isoly.Currency.multiply(currency, amount, charge.rate),
				})
		return result
	}
	export function sum(charges: Transaction.Amount.Charge[], currency: isoly.Currency): number {
		return charges.reduce((sum, charge) => isoly.Currency.add(currency, sum, charge.amount), 0)
	}
}
