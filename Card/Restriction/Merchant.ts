import { isly } from "isly"
import { isly as isly2 } from "isly2"
import type { Transaction } from "../../Transaction"
import { merchants } from "./merchants"

export type Merchant = typeof Merchant.values[number]
export namespace Merchant {
	export const values = [...merchants.map(m => m.name)] as const
	export const type = isly.string<Merchant>(values)
	export const type2 = isly2.string<Merchant>("value", ...values)
	function checkAttribute(
		attribute: typeof merchants[number],
		transaction: Transaction.Creatable.CardTransaction | Transaction.PreTransaction.Authorization
	): boolean {
		if ("unambiguousMcc" in attribute)
			return attribute.unambiguousMcc == transaction.counterpart.merchant.category
		else if ("contains" in attribute && "mccs" in attribute)
			return (
				attribute.mccs.some(mcc => mcc == transaction.counterpart.merchant.category) &&
				attribute.contains.some(n => transaction.counterpart.merchant.name.includes(n))
			)
		else if ("startsWith" in attribute && "mccs" in attribute)
			return (
				attribute.mccs.some(mcc => mcc == transaction.counterpart.merchant.category) &&
				attribute.startsWith.some(n => transaction.counterpart.merchant.name.startsWith(n))
			)
		else
			return false
	}
	export function check(
		merchant: Merchant,
		transaction: Transaction.Creatable.CardTransaction | Transaction.PreTransaction.Authorization
	): boolean {
		const attribute = merchants.find(m => m.name == merchant)
		return !attribute ? false : checkAttribute(attribute, transaction)
	}
}
