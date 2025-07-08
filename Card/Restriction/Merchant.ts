import { isly } from "isly"
import { isly as isly2 } from "isly2"
import { typedly } from "typedly"
import type { Transaction } from "../../Transaction"
import { merchants } from "./merchants"

export type Merchant = typeof Merchant.values[number]
export namespace Merchant {
	export const values = typedly.Object.keys(merchants)
	export const type = isly.string<Merchant>(values)
	export const type2 = isly2.string<Merchant>("value", ...values)
	type Attribute = typeof merchants[keyof typeof merchants]
	export function check(
		merchant: Merchant,
		transaction: Transaction.Creatable.CardTransaction | Transaction.PreTransaction.Authorization
	): boolean {
		const attribute: Attribute = merchants[merchant]
		let result: boolean
		if ("unambiguousMcc" in attribute && attribute.unambiguousMcc == transaction.counterpart.merchant.category)
			result = true
		else if ("contains" in attribute && "mccs" in attribute)
			result =
				attribute.mccs.some(mcc => mcc == transaction.counterpart.merchant.category) &&
				attribute.contains.some(n => transaction.counterpart.merchant.name.includes(n))
		else if ("startsWith" in attribute && "mccs" in attribute)
			result =
				attribute.mccs.some(mcc => mcc == transaction.counterpart.merchant.category) &&
				attribute.startsWith.some(n => transaction.counterpart.merchant.name.startsWith(n))
		else
			result = false
		return result
	}
}
