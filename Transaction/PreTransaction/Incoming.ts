import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../../Rail"
import { Settlement } from "../../Settlement"
import { Reference as TransactionReference } from "../Reference"
import { Base } from "./Base"

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
	export const type = Base.type.extend<Incoming>({
		type: isly.string("incoming"),
		account: Rail.Address.type,
		currency: isly.fromIs("Currency", isoly.Currency.is),
		amount: isly.number(),
		description: isly.string(),
		posted: isly.string(),
		rail: Rail.type.optional(),
		reference: TransactionReference.type.optional(),
	})
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
