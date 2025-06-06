import { isoly } from "isoly"
import { isly } from "isly"
import { Acquirer } from "../../Acquirer"
import { Exchange } from "../../Authorization/Exchange"
import { Merchant } from "../../Merchant"
import { Rail } from "../../Rail"
import type { Transaction } from "../../Transaction"

export interface Authorization {
	card: string
	account: string
	exchange?: Exchange
	acquirer: Acquirer
	description: string
	approvalCode?: string
	time: string
	hour: number
	currency: isoly.Currency
	amount: number
	merchant: Merchant & { reference: string }
	reference?: string
}
export namespace Authorization {
	export function from(transaction: Transaction.Creatable.Resolved | Transaction): Authorization | undefined {
		return Rail.Address.Card.Counterpart.type.is(transaction.counterpart) &&
			"account" in transaction &&
			transaction.account.type == "card" &&
			"id" in transaction.account
			? {
					time: isoly.DateTime.getTime(isoly.DateTime.now()),
					hour: isoly.DateTime.getHour(isoly.DateTime.now()),
					currency: transaction.currency,
					amount: Math.abs(typeof transaction.amount == "number" ? transaction.amount : transaction.amount.original),
					account: transaction.accountId,
					merchant: {
						...transaction.counterpart.merchant,
						reference: `${transaction.counterpart.acquirer.id}-${transaction.counterpart.merchant.id}`,
					},
					card: transaction.account.id,
					acquirer: transaction.counterpart.acquirer,
					reference:
						typeof transaction.reference == "string" ? transaction.reference : transaction.reference?.reference,
					description: transaction.description,
					...("exchange" in transaction ? { exchange: transaction.exchange } : {}),
			  }
			: undefined
	}
	export function toTransaction(authorization: Authorization): Transaction.Creatable & {
		counterpart: Rail.Address.Card.Counterpart
	} {
		return {
			amount: authorization.amount,
			currency: authorization.currency,
			description: authorization.description,
			counterpart: {
				type: "card",
				merchant: authorization.merchant,
				acquirer: authorization.acquirer,
			},
		}
	}
	export const type = isly.object<Authorization>({
		card: isly.string(),
		account: isly.string(),
		exchange: Exchange.type.optional(),
		acquirer: Acquirer.type,
		description: isly.string(),
		approvalCode: isly.string().optional(),
		time: isly.string(),
		hour: isly.number(),
		currency: isly.string(isoly.Currency.values),
		amount: isly.number(),
		merchant: isly.intersection<Authorization["merchant"], Merchant, { reference: string }>(
			Merchant.type,
			isly.object<{ reference: string }>({ reference: isly.string() })
		),
		reference: isly.string().optional(),
	})
}
