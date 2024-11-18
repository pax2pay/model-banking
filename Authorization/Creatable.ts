import { isoly } from "isoly"
import { isly } from "isly"
import { Acquirer } from "../Acquirer"
import { Amount } from "../Amount"
import { Merchant } from "../Merchant"
import { Exchange } from "./Exchange"

export interface Creatable {
	card: string
	account?: string
	amount: Amount
	exchange?: Exchange
	merchant: Merchant
	acquirer: Acquirer
	reference: string
	description: string
}
export namespace Creatable {
	export const type = isly.object<Creatable>({
		card: isly.string(),
		account: isly.string().optional(),
		amount: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		exchange: Exchange.type.optional(),
		merchant: Merchant.type,
		acquirer: Acquirer.type,
		reference: isly.string(),
		description: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
