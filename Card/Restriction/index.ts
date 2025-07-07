import { isly } from "isly"
import { isly as isly2 } from "isly2"
import type { Transaction } from "../../Transaction"
import { Merchant as RestrictionsMerchant } from "./Merchant"

export interface Restriction {
	merchants?: Restriction.Merchant[]
}
export namespace Restriction {
	export import Merchant = RestrictionsMerchant
	export const type = isly.object<Restriction>({ merchants: Merchant.type.array().optional() })
	export const type2 = isly2.object<Restriction>({
		merchants: Merchant.type2
			.array()
			.optional()
			.rename("Merchants")
			.describe("List of merchants that the card can be used with."),
	})
	export function check(
		restrictions: Restriction,
		transaction: Transaction.Creatable.CardTransaction | Transaction.PreTransaction.Authorization
	): boolean {
		let result: boolean = true
		if (restrictions.merchants?.length)
			result = restrictions.merchants.some(merchant => Merchant.check(merchant, transaction))
		return result
	}
}
