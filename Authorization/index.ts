import { gracely } from "gracely"
import { isly } from "isly"
import { Card } from "../Card"
import { Transaction } from "../Transaction"
import { Approved as AuthorizationApproved } from "./Approved"
import { Creatable as AuthorizationCreatable } from "./Creatable"
import { Failed as AuthorizationFailed } from "./Failed"

export type Authorization = Authorization.Failed | Authorization.Approved
export namespace Authorization {
	export function fromCreatable(
		authorization: Authorization.Creatable,
		transaction: Transaction | gracely.Error
	): Authorization {
		return gracely.Error.is(transaction)
			? Authorization.Failed.fromCreatable(authorization, transaction)
			: Authorization.Approved.fromCreatable(authorization, transaction)
	}
	export const type = isly.union<Authorization, Authorization.Failed, Authorization.Approved>(
		Authorization.Failed.type,
		Authorization.Approved.type
	)
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
	export type Approved = AuthorizationApproved
	export const Approved = AuthorizationApproved
	export type Failed = AuthorizationFailed
	export const Failed = AuthorizationFailed
	export type Creatable = AuthorizationCreatable
	export const Creatable = AuthorizationCreatable
}
