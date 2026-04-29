import { isly } from "isly"
import type { Transaction } from "../../Transaction"
import { Merchant as RestrictionsMerchant } from "./Merchant"

export interface Restriction {
	merchants?: Restriction.Merchant[]
}
export namespace Restriction {
	export import Merchant = RestrictionsMerchant
	export const type = isly.object<Restriction>({ merchants: Merchant.type.array().optional() })
	export function check(
		restrictions: Restriction,
		transaction: Transaction.Creatable.CardTransaction | Transaction.PreTransaction.Authorization
	): boolean {
		let result: boolean = true
		if (restrictions.merchants?.length) {
			result = restrictions.merchants.some(merchant => Merchant.check(merchant, transaction.counterpart))
		}
		return result
	}
}
