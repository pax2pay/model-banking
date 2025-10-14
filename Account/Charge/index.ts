import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import type { Card } from "../../Card"
import type { Rail } from "../../Rail"
import type { Transaction } from "../../Transaction"
import { Applies } from "./Applies"

export interface Charge extends Charge.Creatable {
	id: string
}
export namespace Charge {
	export interface Creatable {
		destination: { account: string }
		rate: number // rate: 0.01 for 1%
		applies: Applies
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			destination: isly.object({ account: isly.string() }),
			rate: isly.number(),
			applies: Applies.type,
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
		for (const charge of charges)
			if (Applies.evaluate(charge.applies, counterpart, preset, exchange))
				result.push(toTransactionAmountCharge(currency, amount, charge))
		return result
	}
	function toTransactionAmountCharge(
		currency: isoly.Currency,
		amount: number,
		charge: Charge
	): Transaction.Amount.Charge {
		return {
			amount: -isoly.Currency.multiply(currency, amount, charge.rate),
			charge,
		}
	}
	export function sum(charges: Transaction.Amount.Charge[], currency: isoly.Currency): number {
		return charges.reduce((sum, charge) => isoly.Currency.add(currency, sum, charge.amount), 0)
	}
}
