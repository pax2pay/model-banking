import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"
import { Transaction } from "../Transaction"

export type Charge = {
	id: string
	destination: { account: string }
	rate: number // rate: 0.01 for 1%
	applies: {
		to: {
			merchants: Card.Restriction.Merchant[]
		}
	}
}
export namespace Charge {
	export const type = isly.object<Charge>({
		id: isly.string(),
		destination: isly.object({ account: isly.string() }),
		rate: isly.number(),
		applies: isly.object({
			to: isly.object<Charge["applies"]["to"]>({
				merchants: Card.Restriction.Merchant.type.array(),
			}),
		}),
	})
	export function evaluate(
		charges: Charge[] = [],
		transaction: Transaction.Creatable.Resolved | Transaction
	): Transaction.Amount.Charge[] {
		const result: Transaction.Amount.Charge[] = []
		for (const charge of charges)
			if ("merchant" in transaction.counterpart)
				for (const merchant of charge.applies.to.merchants)
					if (Card.Restriction.Merchant.check(merchant, transaction.counterpart))
						result.push({
							destination: charge.destination,
							type: "merchant",
							amount: isoly.Currency.multiply(
								transaction.currency,
								typeof transaction.amount == "number" ? transaction.amount : transaction.amount.original,
								charge.rate
							),
						})
		return result
	}
	export function sum(charges: Transaction.Amount.Charge[], currency: isoly.Currency): number {
		return charges.reduce((sum, charge) => isoly.Currency.add(currency, sum, charge.amount), 0)
	}
}
