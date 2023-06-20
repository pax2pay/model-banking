import { isly } from "isly"
import { Card as ModelCard } from "../Card"
import { Merchant } from "../Merchant"

export interface Card {
	type: Card.Type
	id: string
	iin: string
	last4: string
	expiry: ModelCard.Expiry
	holder: string
	merchant: Merchant
}
export namespace Card {
	export const currencies = ["EUR", "GBP", "SEK", "USD"] as const
	type Mastercard = "mastercard"
	type Visa = "visa"
	export type Type = Mastercard | Visa
	export const type = isly.object<Card>({
		type: isly.union<Type, Mastercard, Visa>(isly.string("mastercard"), isly.string("visa")),
		id: isly.string(),
		iin: isly.string(),
		last4: isly.string(),
		expiry: ModelCard.Expiry.type,
		holder: isly.string(),
		merchant: Merchant.type,
	})
	export const is = type.is
	export const flaw = type.flaw
}
