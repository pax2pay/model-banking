import { isoly } from "isoly"
import { isly } from "isly"
import { Acquirer } from "../Acquirer"
import { Amount } from "../Amount"
import { Merchant } from "../Merchant"
import { Transaction } from "../Transaction"
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
	approvalCode?: string
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
		approvalCode: isly.string().optional(),
	})
	export function toTransaction(creatable: Creatable | any): Transaction.Creatable.CardTransaction | undefined {
		return type.is(creatable)
			? {
					account: { id: creatable.card, type: "card" },
					amount: creatable.amount[1],
					currency: creatable.amount[0],
					counterpart: {
						type: "card",
						merchant: creatable.merchant,
						acquirer: creatable.acquirer,
					},
					reference: { reference: creatable.reference },
					description: creatable.description,
					approvalCode: creatable.approvalCode,
					exchange: creatable.exchange,
			  }
			: undefined
	}
}
