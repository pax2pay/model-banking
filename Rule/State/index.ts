import { Account as ModelAccount } from "../../Account"
import { Transaction as ModelTransaction } from "../../Transaction"
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
}

export namespace State {
	export function from(
		data: StateData,
		account: ModelAccount,
		transactions: StateAccount.Transactions,
		days: StateAccount.Days,
		transaction: ModelTransaction.Creatable,
		authorization?: StateAuthorization,
		card?: StateCard,
		organization?: StateOrganization
	): State {
		return {
			data,
			account: Account.from(account, transactions, days),
			transaction: Transaction.from(transaction),
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
