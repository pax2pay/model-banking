import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { Card } from "../../Card"
import type { Rail } from "../../Rail"
import type { Transaction } from "../../Transaction"
import { Fx as ChargeFx } from "./Fx"
import { Merchant as ChargeMerchant } from "./Merchant"

export type Charge = ChargeMerchant | ChargeFx
export namespace Charge {
	export import Merchant = ChargeMerchant
	export import Fx = ChargeFx
	export function fromCreatable(creatable: ChargeMerchant.Creatable | ChargeFx.Creatable): Charge {
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
			if (charge.type === "merchant" && Merchant.evaluate(charge, counterpart, preset))
				result.push(toTransactionAmountCharge(currency, amount, charge))
			if (charge.type === "fx" && exchange)
				result.push(toTransactionAmountCharge(currency, amount, charge))
		}
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
