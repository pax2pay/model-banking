import { Account as ModelAccount } from "../../Account"
import { Authorization as ModelAuthorization } from "../../Authorization"
import { Card as ModelCard } from "../../Card"
import { Transaction as ModelTransaction } from "../../Transaction"
import { Account as StateAccount } from "./Account"
import { Authorization as StateAuthorization } from "./Authorization"
import { Card as StateCard } from "./Card"
import { Data as StateData } from "./Data"
import { Partial as StatePartial } from "./Partial"
import { Transaction as StateTransaction } from "./Transaction"

export interface State {
	data: StateData
	account: StateAccount
	transaction: StateTransaction
	authorization?: StateAuthorization
	card?: StateCard
}

export namespace State {
	export function from(
		data: StateData,
		account: ModelAccount,
		transactions: StateAccount.Transactions,
		days: StateAccount.Days,
		transaction: ModelTransaction.Creatable,
		authorization?: ModelAuthorization.Creatable,
		card?: ModelCard
	): State {
		return {
			data,
			account: Account.from(account, transactions, days),
			transaction: Transaction.from(transaction),
			authorization: authorization && Authorization.from(authorization),
			card: card && Card.from(card),
		}
	}
	export type Partial = StatePartial
	export const Partial = StatePartial
	export type Authorization = StateAuthorization
	export const Authorization = StateAuthorization
	export type Card = StateCard
	export const Card = StateCard
	export type Account = StateAccount
	export const Account = StateAccount
	export namespace Account {
		export type Transactions = StateAccount.Transactions
		export type Days = StateAccount.Days
	}
	export type Transaction = StateTransaction
	export const Transaction = StateTransaction
	export type Data = StateData
}
