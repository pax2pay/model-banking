import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../Rail"
import { Settlement } from "../Settlement"
import { Creatable as TransactionCreatable } from "./Creatable"
import { Reference as TransactionReference } from "./Reference"

export interface Incoming extends TransactionCreatable {
	account: Rail.Address
	posted: string
	rail: Rail
	reference?: TransactionReference
}
export namespace Incoming {
	export const type = TransactionCreatable.type.extend<Incoming>({
		account: isly.fromIs("Rail.Address", Rail.Address.is),
		posted: isly.string(),
		rail: Rail.type,
		reference: TransactionReference.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function fromRefund(entry: Settlement.Entry.Refund.Creatable, card: Rail.Address.Card): Incoming {
		const [currency, amount] = entry.amount
		return {
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
