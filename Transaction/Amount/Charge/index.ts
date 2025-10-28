import { isoly } from "isoly"
import { isly } from "isly"
import { PreTransaction } from "Transaction/PreTransaction"
import { Card } from "../../../Card"
import { Rail } from "../../../Rail"

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
	export function total(currency: isoly.Currency, charges: Charge): number {
		return isoly.Currency.add(currency, charges.fx?.amount ?? 0, charges.merchant?.amount ?? 0)
	}
	export function transactionsFromCharge(
		charge: Charge,
		account: string,
		id: string,
		currency: isoly.Currency,
		fxCollectAccount: string
	): {
		merchant: (PreTransaction.Incoming & { counterpart: Rail.Address.Internal }) | undefined
		fx: (PreTransaction.Incoming & { counterpart: Rail.Address.Internal }) | undefined
	} {
		const merchant = charge.merchant && transactionFromMerchantCharge(charge.merchant, account, id, currency)
		const fx = charge.fx && transactionFromFxCharge(charge.fx, account, id, currency, fxCollectAccount)
		return { merchant, fx }
	}
	function transactionFromMerchantCharge(
		charge: Merchant,
		account: string,
		id: string,
		currency: isoly.Currency
	): PreTransaction.Incoming & { counterpart: Rail.Address.Internal } {
		return {
			type: "incoming",
			account: { type: "internal", identifier: charge.destination.account },
			counterpart: { type: "internal", identifier: account },
			currency: currency,
			amount: charge.amount,
			description: `Merchant charge for transaction ${id}`,
			posted: isoly.DateTime.now(),
			rail: "internal",
			reference: { reference: id, returnId: id },
		}
	}
	function transactionFromFxCharge(
		charge: Fx,
		account: string,
		id: string,
		currency: isoly.Currency,
		collectAccount: string
	): PreTransaction.Incoming & { counterpart: Rail.Address.Internal } {
		return {
			type: "incoming",
			account: { type: "internal", identifier: collectAccount },
			amount: charge.amount,
			currency: currency,
			description: `FX charge ${id}`,
			counterpart: { type: "internal", identifier: account },
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
