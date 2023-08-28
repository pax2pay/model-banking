import { cryptly } from "cryptly"
import { gracely } from "gracely"
import { isoly } from "isoly"
import { isly } from "isly"
import { Acquirer } from "../Acquirer"
import { Amount } from "../Amount"
import { Card } from "../Card"
import { Merchant } from "../Merchant"
import { Transaction } from "../Transaction"
import { Creatable as AuthorizationCreatable } from "./Creatable"

export interface Authorization {
	id: cryptly.Identifier
	created: isoly.DateTime
	status: "approved" | { code: string; reason: string | string[]; error?: gracely.Error }
	reference: string
	amount: Amount
	card: {
		id: string
		token: string
		iin: string
		last4: string
	}
	transaction?: {
		id: string
		posted: isoly.DateTime
		description: string
	}
	account: string
	merchant: Merchant
	acquirer: Acquirer
	description: string
}
export namespace Authorization {
	export type Creatable = AuthorizationCreatable
	export const Creatable = AuthorizationCreatable

	export const type = isly.object<Authorization>({
		id: isly.fromIs("Authorization.id", cryptly.Identifier.is),
		status: isly.union(
			isly.string("approved"),
			isly.object({
				code: isly.string(),
				reason: isly.union(isly.string(), isly.string().array()),
				error: isly.fromIs("gracely.Error", gracely.Error.is).optional(),
			})
		),
		transaction: isly
			.object<{
				id: string
				posted: isoly.DateTime
				description: string
			}>({
				id: isly.string(),
				posted: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
				description: isly.string(),
			})
			.optional(),
		card: isly.object<{
			id: string
			token: string
			iin: string
			last4: string
		}>({
			id: isly.string(),
			token: isly.string(),
			iin: isly.string(),
			last4: isly.string(),
		}),
		created: isly.fromIs("Authorization.created", isoly.DateTime.is),
		amount: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		account: isly.string(),
		merchant: Merchant.type,
		acquirer: Acquirer.type,
		reference: isly.string(),
		description: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function fromCreatable(
		authorization: Creatable,
		card: Card,
		transaction: Transaction | gracely.Error
	): Authorization {
		return {
			id: cryptly.Identifier.generate(8),
			card: { id: card.id, iin: card.details.iin, last4: card.details.last4, token: card.details.token },
			created: isoly.DateTime.now(),
			amount: authorization.amount,
			merchant: authorization.merchant,
			acquirer: authorization.acquirer,
			reference: authorization.reference,
			account: card.account,
			description: authorization.description,
			...(gracely.Error.is(transaction)
				? { ...statusFrom(transaction), error: transaction }
				: {
						transaction: { id: transaction.id, posted: transaction.posted, description: transaction.description },
						status: "approved",
				  }),
		}
	}
	export function statusFrom(transaction: gracely.Error): Pick<Authorization, "status"> {
		let result: Pick<Authorization, "status">
		if (transaction.error?.includes("Card with id"))
			result = { status: { code: "14", reason: "Invalid card number" } }
		else if (transaction.error?.includes("must correspond to card limit")) {
			result = { status: { code: "13", reason: "Invalid amount" } }
		} else if (transaction.error?.includes("Failed to reach account")) {
			result = { status: { code: "78", reason: "Invalid/nonexistent account specified (general)" } }
		} else if (gracely.client.InvalidContent.is(transaction) && transaction.content.description.includes("rules")) {
			const reasons: string[] = transaction.content.details?.notes.reduce(
				(a: string[], c: Transaction.Note) => [...a, `${c.created} ${c.author}: ${c.text ?? ""}`],
				[]
			)
			result = {
				status: {
					code: "62", //Restricted card: "This means that the card that you processed is restricted to where it can be used.
					//The restricted card is only allowed to be used for certain types of businesses or purchases."
					reason: ["Restricted card.", ...reasons],
				},
			}
		} else
			result = { status: { code: "05", reason: "Do not honor" } } //default
		return result
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
