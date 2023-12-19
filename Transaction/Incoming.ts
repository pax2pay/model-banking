import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../Rail"
import { Settlement } from "../Settlement"
import { Creatable as TransactionCreatable } from "./Creatable"
import { Reference as TransactionReference } from "./Reference"

export interface Incoming extends TransactionCreatable {
	account: Rail
	posted: string
	reference?: TransactionReference
}
export namespace Incoming {
	export const type = TransactionCreatable.type.extend<Incoming>({
		account: isly.fromIs("Rail", Rail.is),
		posted: isly.string(),
		reference: TransactionReference.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function fromRefund(entry: Settlement.Entry.Refund.Creatable, card: Rail.Card): Incoming {
		const [currency, amount] = entry.amount
		return {
			account: card,
			currency,
			amount: isoly.Currency.add(currency, -amount, -(entry.fee.other[currency] ?? 0)),
			posted: isoly.DateTime.now(),
			counterpart: { type: "card", merchant: entry.merchant, acquirer: entry.acquirer },
			description: "Refund transaction.",
		}
	}
}
