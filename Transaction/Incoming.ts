import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../Rail"
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
}
