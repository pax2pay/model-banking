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
	export function fromTransaction(transaction: Transaction.CardTransaction, approvalCode: string): Creatable {
		return {
			card: transaction.account.id,
			account: transaction.accountId,
			amount: [transaction.currency, -transaction.amount.original],
			merchant: transaction.counterpart.merchant,
			acquirer: transaction.counterpart.acquirer,
			reference: "",
			description: transaction.description,
			approvalCode,
		}
	}
}
