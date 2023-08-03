import { Account as ModelAccount } from "../../Account"
import { Authorization as ModelAuthorization } from "../../Authorization"
import { Card as ModelCard } from "../../Card"
import { Transaction as ModelTransaction } from "../../Transaction"
import { Account as StateAccount } from "./Account"
import { Authorization as StateAuthorization } from "./Authorization"
import { Card as StateCard } from "./Card"
import { Transaction as StateTransaction } from "./Transaction"

export interface State {
	account: StateAccount
	authorization?: StateAuthorization
	card?: StateCard
	transaction: StateTransaction
}

export namespace State {
	export function from(
		account: ModelAccount,
		transaction: ModelTransaction,
		authorization?: ModelAuthorization,
		card?: ModelCard
	): State {
		return {
			account: Account.from(account),
			authorization: authorization && Authorization.from(authorization),
			card: card && Card.from(card),
			transaction: Transaction.from(transaction),
		}
	}
	export type Account = StateAccount
	export const Account = StateAccount
	export type Authorization = StateAuthorization
	export const Authorization = StateAuthorization
	export type Card = StateCard
	export const Card = StateCard
	export type Transaction = StateTransaction
	export const Transaction = StateTransaction
}
