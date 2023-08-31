import { cryptly } from "cryptly"
import { gracely } from "gracely"
import { isoly } from "isoly"
import { isly } from "isly"
import { Acquirer } from "../Acquirer"
import { Amount } from "../Amount"
import { Card } from "../Card"
import { Identifier } from "../Identifier"
import { Merchant } from "../Merchant"
import { Transaction } from "../Transaction"
import { Creatable as AuthorizationCreatable } from "./Creatable"
import { Status } from "./Status"

export interface Authorization {
	id: cryptly.Identifier
	created: isoly.DateTime
	status: Status
	reference: string
	amount: Amount
	card: {
		id: string
		token?: string
		iin?: string
		last4?: string
	}
	transaction?: {
		id: string
		posted: isoly.DateTime
		description: string
	}
	account?: string
	merchant: Merchant
	acquirer: Acquirer
	description: string
}
export namespace Authorization {
	export type Creatable = AuthorizationCreatable
	export const Creatable = AuthorizationCreatable

	export const type = isly.object<Authorization>({
		id: isly.fromIs("Authorization.id", cryptly.Identifier.is),
		status: Status.type,
		transaction: isly
			.object<Required<Authorization>["transaction"]>({
				id: isly.string(),
				posted: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
				description: isly.string(),
			})
			.optional(),
		card: isly.object<Authorization["card"]>({
			id: isly.string(),
			token: isly.string().optional(),
			iin: isly.string().optional(),
			last4: isly.string().optional(),
		}),
		created: isly.fromIs("Authorization.created", isoly.DateTime.is),
		amount: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		account: isly.string().optional(),
		merchant: Merchant.type,
		acquirer: Acquirer.type,
		reference: isly.string(),
		description: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function fromCreatable(
		creatable: Creatable,
		card: Card | gracely.Error,
		transaction?: Transaction | gracely.Error
	): Authorization {
		return {
			id: Identifier.generate(),
			...{ status: "approved" },
			...(gracely.Error.is(card)
				? { card: { id: creatable.card }, status: { ...Status.Failed.from(card), error: card } }
				: {
						card: { id: card.id, iin: card.details.iin, last4: card.details.last4, token: card.details.token },
						account: card.account,
				  }),
			created: isoly.DateTime.now(),
			amount: creatable.amount,
			merchant: creatable.merchant,
			acquirer: creatable.acquirer,
			reference: creatable.reference,
			description: creatable.description,
			...(!transaction
				? {}
				: gracely.Error.is(transaction)
				? { ...Status.Failed.from(transaction), error: transaction }
				: {
						id: transaction.id,
						transaction: { id: transaction?.id, posted: transaction?.posted, description: transaction.description },
				  }),
		}
	}

	export function toTransaction(authorization: Authorization, card: Card): Transaction.Creatable {
		return {
			amount: authorization.amount[1],
			currency: authorization.amount[0],
			description: authorization.description,
			counterpart: {
				type: "card",
				scheme: "mastercard",
				iin: card.details.iin,
				expiry: card.details.expiry,
				last4: card.details.last4,
				holder: card.details.holder,
				id: card.id,
				merchant: authorization.merchant,
				acquirer: authorization.acquirer,
			},
		}
	}
}
