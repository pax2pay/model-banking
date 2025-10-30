import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../../../Card"
import { Rail } from "../../../Rail"
import { PreTransaction } from "../../PreTransaction"

export interface Charge {
	merchant?: Charge.Merchant
	fx?: Charge.Fx
}
export namespace Charge {
	export interface Fx {
		amount: number
		rate: number
		preset: Card.Preset | "default"
	}
	export namespace Fx {
		export const type = isly.object<Fx>({
			amount: isly.number(),
			rate: isly.number(),
			preset: isly.union(Card.Preset.type, isly.string("default")),
		})
	}
	export interface Merchant {
		amount: number
		rate: number
		merchant: Card.Restriction.Merchant
		preset: Card.Preset | "default"
		destination: { account: string }
	}
	export namespace Merchant {
		export const type = isly.object<Merchant>({
			amount: isly.number(),
			rate: isly.number(),
			merchant: Card.Restriction.Merchant.type,
			preset: isly.union(Card.Preset.type, isly.string("default")),
			destination: isly.object({
				account: isly.string(),
			}),
		})
	}
	export type ChargeTransaction = PreTransaction.Incoming & { account: Rail.Address.Internal }
	export function total(currency: isoly.Currency, charges: Charge): number {
		return isoly.Currency.add(currency, charges.fx?.amount ?? 0, charges.merchant?.amount ?? 0)
	}
	export function toTransactions(
		charge: Charge,
		account: string,
		id: string,
		currency: isoly.Currency,
		fxCollectAccount: string
	): {
		merchant: ChargeTransaction | undefined
		fx: ChargeTransaction | undefined
	} {
		const merchant =
			charge.merchant && toTransaction(charge.merchant, account, id, currency, fxCollectAccount, "merchant")
		const fx = charge.fx && toTransaction(charge.fx, account, id, currency, fxCollectAccount, "fx")
		return { merchant, fx }
	}
	function toTransaction(
		charge: Charge.Merchant | Charge.Fx,
		account: string,
		id: string,
		currency: isoly.Currency,
		fxCollectAccount: string,
		type: "merchant" | "fx"
	): ChargeTransaction {
		const accountId = Merchant.type.is(charge) ? charge.destination.account : fxCollectAccount
		return {
			type: "incoming",
			account: { type: "internal", identifier: accountId },
			counterpart: { type: "internal", identifier: account },
			currency: currency,
			amount: charge.amount,
			description: `${type} charge for transaction ${id}`,
			posted: isoly.DateTime.now(),
			rail: "internal",
			reference: { reference: id, returnId: id },
		}
	}
	export const type = isly.object<Charge>({
		merchant: Charge.Merchant.type.optional(),
		fx: Charge.Fx.type.optional(),
	})
}
