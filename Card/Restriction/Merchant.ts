import { isly } from "isly"
import { isly as isly2 } from "isly2"
import { typedly } from "typedly"
import { Rail } from "../../Rail"
import { merchants } from "./merchants"
import { Merchant as Attribute } from "./merchants/Merchant"

export type Merchant = typeof Merchant.values[number]
export namespace Merchant {
	export const values = typedly.Object.keys(merchants)
	export const type = isly.string<Merchant>(values)
	export const type2 = isly2.string<Merchant>("value", ...values)
	export function check(merchant: Merchant, counterpart: Rail.Address.Card.Counterpart): boolean {
		const attribute: Attribute = merchants[merchant]
		let result: boolean
		if (attribute?.unambiguousMcc == counterpart.merchant.category)
			result = true
		else if (attribute.contains && attribute.mccs)
			result =
				attribute.mccs.some(mcc => mcc == counterpart.merchant.category) &&
				attribute.contains.some(n => counterpart.merchant.name.includes(n))
		else if (attribute.startsWith && attribute.mccs)
			result =
				attribute.mccs.some(mcc => mcc == counterpart.merchant.category) &&
				attribute.startsWith.some(n => counterpart.merchant.name.startsWith(n))
		else
			result = false
		return result
	}
}
