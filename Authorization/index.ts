import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Acquirer } from "../Acquirer"
import { Card } from "../Card"
import { Merchant } from "../Merchant"
import { Transaction } from "../Transaction"
import { Creatable as AuthorizationCreatable } from "./Creatable"

export interface Authorization {
	id: cryptly.Identifier
	card: string
	created: isoly.DateTime
	amount: [isoly.Currency, number]
	merchant: Merchant
	acquirer: Acquirer
	description: string
	transaction?: string
	status?: "approved" | { code: string; reason: string }
}
export namespace Authorization {
	export function fromCreatable(authorization: Authorization.Creatable): Authorization {
		return {
			id: cryptly.Identifier.generate(8),
			card: authorization.card,
			created: isoly.DateTime.now(),
			amount: authorization.amount,
			merchant: authorization.merchant,
			acquirer: authorization.acquirer,
			description: authorization.description,
		}
	}
	export const type = isly.object<Authorization>({
		id: isly.fromIs("Authorization.id", cryptly.Identifier.is),
		card: isly.string(),
		created: isly.fromIs("Authorization.created", isoly.DateTime.is),
		amount: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		merchant: Merchant.type,
		acquirer: Acquirer.type,
		description: isly.string(),
		transaction: isly.string().optional(),
		status: isly
			.union(
				isly.string("approved"),
				isly.object<{ code: string; reason: string }>({ code: isly.string(), reason: isly.string() })
			)
			.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw

	export function toTransaction(authorization: Authorization, card: Card): Transaction.Creatable {
		return {
			amount: authorization.amount[1],
			currency: authorization.amount[0],
			description: authorization.description,
			counterpart: {
				type: "mastercard",
				iin: card.details.iin,
				expiry: card.details.expiry,
				last4: card.details.last4,
				holder: card.details.holder,
				id: card.id,
				merchant: authorization.merchant,
			},
		}
	}
	export type Creatable = AuthorizationCreatable
	export const Creatable = AuthorizationCreatable
}
