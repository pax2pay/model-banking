import { isly } from "isly"
import { Acquirer } from "../Acquirer"
import { Card as ModelCard } from "../Card"
import { Merchant } from "../Merchant"

export interface Card {
	type: "card"
	scheme: ModelCard.Scheme
	id: string
	iin: string
	last4: string
	expiry: ModelCard.Expiry
	holder: string
}
interface CardCounterpart {
	type: "card"
	merchant: Merchant
	acquirer: Acquirer
}
namespace CardCounterpart {
	export const type = isly.object<CardCounterpart>({
		type: isly.string("card"),
		acquirer: Acquirer.type,
		merchant: Merchant.type,
	})
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
	})
	export const is = type.is
	export const flaw = type.flaw
	export const Counterpart = CardCounterpart
	export type Counterpart = CardCounterpart
}
