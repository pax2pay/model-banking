import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../Rail"
import { Settlement } from "../Settlement"
import { Reference as TransactionReference } from "./Reference"

export interface Incoming {
	account: Rail.Address
	counterpart: Rail.Address
	currency: isoly.Currency
	amount: number
	description: string
	posted: string
	rail?: Rail
	reference?: TransactionReference
}
export namespace Incoming {
	export const type = isly.object<Incoming>({
		account: Rail.Address.type,
		counterpart: Rail.Address.type,
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		amount: isly.number(),
		description: isly.string(),
		posted: isly.string(),
		rail: Rail.type.optional(),
		reference: TransactionReference.type.optional(),
	})

	export function fromRefund(
		entry: Settlement.Entry.Creatable.Known & { type: "refund" },
		card: Rail.Address.Card
	): Incoming {
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
