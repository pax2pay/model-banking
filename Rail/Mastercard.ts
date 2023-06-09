import { isly } from "isly"
import { Card } from "../Card"

export interface Mastercard {
	type: "mastercard"
	id: string
	iin: string
	last4: string
	expiry: Card.Expiry
	holder: string
}
export namespace Mastercard {
	export const currencies = ["EUR", "GBP", "SEK", "USD"] as const
	export const type = isly.object<Mastercard>({
		type: isly.string("mastercard"),
		id: isly.string(),
		iin: isly.string(),
		last4: isly.string(),
		expiry: Card.Expiry.type,
		holder: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
