import * as cryptly from "cryptly"
import { Transaction } from "../Transaction"

export interface Reviewable {
	transaction: Transaction
	direction: "incoming" | "outgoing"
	organization: cryptly.Identifier
	account: cryptly.Identifier
	rule: string
}
export namespace Reviewable {
	export function open(
		transaction: Transaction,
		direction: "incoming" | "outgoing",
		organization: cryptly.Identifier,
		account: cryptly.Identifier,
		rule: string
	) {
		return {
			transaction: transaction,
			direction: direction,
			organization: organization,
			account: account,
			rule: rule,
		}
	}
	export function is(value: Reviewable | any): value is Reviewable {
		return (
			value &&
			typeof value == "object" &&
			Transaction.is(value.transaction) &&
			cryptly.Identifier.is(value.organization) &&
			cryptly.Identifier.is(value.account) &&
			typeof value.rule == "string" &&
			(value.direction == "incoming" || value.direction == "outgoing")
		)
	}
}
