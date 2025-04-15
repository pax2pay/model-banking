import { isoly } from "isoly"
import { Rail } from "../../Rail"
import { Settlement } from "../../Settlement"
import { Reference as TransactionReference } from "../Reference"
import type { Base } from "./Base"

export interface Incoming extends Base {
	type: "incoming"
	account: Rail.Address
	currency: isoly.Currency
	amount: number
	description: string
	posted: string
	rail?: Rail
	reference?: TransactionReference
}
export namespace Incoming {
	export function fromRefund(entry: Settlement.Entry.Creatable.Refund, card: Rail.Address.Card): Incoming {
		const [currency, amount] = entry.amount
		return {
			type: "incoming",
			account: card,
			currency,
			amount: isoly.Currency.add(currency, -amount, -(entry.fee.other[currency] ?? 0)),
			posted: isoly.DateTime.now(),
			counterpart: { type: "card", merchant: entry.merchant, acquirer: entry.acquirer },
			description: "Refund transaction.",
			rail: card.scheme,
		}
	}
}
