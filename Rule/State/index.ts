import { isly } from "isly"
import { Account as ModelAccount } from "../../Account"
import { Transaction as ModelTransaction } from "../../Transaction"
import { Rule } from "../Rule"
import { Account as StateAccount } from "./Account"
import { Authorization as StateAuthorization } from "./Authorization"
import { Card as StateCard } from "./Card"
import { Data as StateData } from "./Data"
import { Organization as StateOrganization } from "./Organization"
import { Partial as StatePartial } from "./Partial"
import { Transaction as StateTransaction } from "./Transaction"

export interface State {
	data: StateData
	account: StateAccount
	transaction: StateTransaction
	authorization?: StateAuthorization
	card?: StateCard
	organization?: StateOrganization
	outcome?: State.Outcome
	flags?: string[]
	notes?: ModelTransaction.Note[]
}
export namespace State {
	export type Outcome = typeof Outcome.values[number]
	export namespace Outcome {
		export const values = ["approve", "reject", "review"]
		export const type = isly.string<Outcome>(values)
	}
	export function from(
		data: StateData,
		account: ModelAccount,
		transactions: StateAccount.Transactions,
		days: StateAccount.Days,
		transaction: ModelTransaction.Creatable,
		kind: Rule.Base.Kind,
		authorization?: StateAuthorization,
		card?: StateCard,
		organization?: StateOrganization
	): State {
		return {
			data,
			account: Account.from(account, transactions, days),
			transaction: Transaction.from(transaction, kind),
			authorization,
			card,
			organization,
		}
	}
	export import Partial = StatePartial
	export import Authorization = StateAuthorization
	export import Card = StateCard
	export import Account = StateAccount
	export import Transaction = StateTransaction
	export import Organization = StateOrganization
	export type Data = StateData
}
