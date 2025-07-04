import { isly } from "isly"
import { isly as isly2 } from "isly2"

export interface Restrictions {
	merchants?: Restrictions.Merchant[]
}
export namespace Restrictions {
	export type Merchant = typeof Merchant.values[number]
	export namespace Merchant {
		export const values = ["ryanair"] as const
		export const type = isly.string<Merchant>(values)
		export const type2 = isly2.string<Merchant>("value", ...values)
	}
	export const type = isly.object<Restrictions>({ merchants: Merchant.type.array().optional() })
	export const type2 = isly2.object<Restrictions>({
		merchants: Merchant.type2
			.array()
			.optional()
			.rename("Merchants")
			.describe("List of merchants that the card can be used with."),
	})
}
