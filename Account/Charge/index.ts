import { isoly } from "isoly"
import { isly } from "isly"
import type { Card } from "../../Card"
import type { Rail } from "../../Rail"
import type { Transaction } from "../../Transaction"
import { Fx as ChargeFx } from "./Fx"
import { Merchant as ChargeMerchant } from "./Merchant"

export type Charge = { merchant?: Charge.Merchant; fx?: Charge.Fx }
export namespace Charge {
	export import Merchant = ChargeMerchant
	export import Fx = ChargeFx
	export const type = isly.object<Charge>({ merchant: ChargeMerchant.type, fx: ChargeFx.type })
	export function evaluate(
		counterpart: Rail.Address.Card.Counterpart,
		currency: isoly.Currency,
		amount: number,
		preset?: Card.Preset,
		charges?: Charge,
		exchange?: Transaction.Exchange
	): Transaction.Amount.Charge {
		const merchant =
			charges?.merchant && ChargeMerchant.evaluate(charges.merchant, currency, amount, counterpart, preset)
		const fx = charges?.fx && ChargeFx.evaluate(charges.fx, currency, amount, preset, exchange)

		return {
			...(merchant && { merchant }),
			...(fx && { fx }),
		}
	}
}
