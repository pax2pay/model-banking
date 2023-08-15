import { isoly } from "isoly"
import { isly } from "isly"
import { Acquirer } from "../Acquirer"
import { Merchant } from "../Merchant"

export interface Creatable {
	card: string
	amount: [isoly.Currency, number]
	merchant: Merchant
	acquirer: Acquirer
	reference: string
	description: string
}
export namespace Creatable {
	export const type = isly.object<Creatable>({
		card: isly.string(),
		amount: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		merchant: Merchant.type,
		acquirer: Acquirer.type,
		reference: isly.string(),
		description: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
