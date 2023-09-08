import { isly } from "isly"
import { Acquirer } from "../../Acquirer"
import { Card as ModelCard } from "../../Card"
import { Merchant } from "../../Merchant"

export interface Card {
	type: "card"
	scheme: ModelCard.Scheme
	id: string
	iin: string
	last4: string
	expiry: ModelCard.Expiry
	holder: string
	merchant: Merchant
	acquirer: Acquirer
}
export namespace Card {
	export const currencies = ["EUR", "GBP", "SEK", "USD"] as const
	export const type = isly.object<Card>({
		type: isly.string("card"),
		scheme: ModelCard.Scheme.type,
		id: isly.string(),
		iin: isly.string(),
		last4: isly.string(),
		expiry: ModelCard.Expiry.type,
		holder: isly.string(),
		merchant: Merchant.type,
		acquirer: Acquirer.type,
	})
	export const is = type.is
	export const flaw = type.flaw
}
