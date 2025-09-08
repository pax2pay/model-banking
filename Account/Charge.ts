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
		transaction: Transaction.Creatable.Resolved | Transaction
	): Transaction.Amount.Charge[] {
		const result: Transaction.Amount.Charge[] = []
		const counterpart = "merchant" in transaction.counterpart ? transaction.counterpart : undefined
		if (counterpart)
			for (const charge of charges)
				if (charge.applies.to.merchants.some(merchant => Card.Restriction.Merchant.check(merchant, counterpart)))
					result.push({
						destination: charge.destination,
						type: "merchant",
						amount: isoly.Currency.multiply(
							transaction.currency,
							typeof transaction.amount == "number" ? transaction.amount : -transaction.amount.original,
							charge.rate
						),
					})
		return result
	}
	export function sum(charges: Transaction.Amount.Charge[], currency: isoly.Currency): number {
		return charges.reduce((sum, charge) => isoly.Currency.add(currency, sum, charge.amount), 0)
	}
}
