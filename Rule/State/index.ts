import { Account as ModelAccount } from "../../Account"
import { Authorization as ModelAuthorization } from "../../Authorization"
import { Card as ModelCard } from "../../Card"
import { Transaction as ModelTransaction } from "../../Transaction"
import { Account as StateAccount } from "./Account"
import { Authorization as StateAuthorization } from "./Authorization"
import { Card as StateCard } from "./Card"
import { Partial as StatePartial } from "./Partial"
import { Transaction as StateTransaction } from "./Transaction"

export interface State {
	account: StateAccount
	transaction: StateTransaction
	authorization?: StateAuthorization
	card?: StateCard
}

export namespace State {
	export function from(
		account: ModelAccount,
		transactions: { today: { volume: number; spent: number }; card: { today: { volume: number; spent: number } } },
		transaction: ModelTransaction.Creatable,
		authorization?: ModelAuthorization.Creatable,
		card?: ModelCard
	): State {
		return {
			account: Account.from(account, transactions),
			authorization: authorization && Authorization.from(authorization),
			card: card && Card.from(card),
			transaction: Transaction.from(transaction),
		}
	}
	export type Partial = StatePartial
	export const Partial = StatePartial
	export type Account = StateAccount
	export const Account = StateAccount
	export type Authorization = StateAuthorization
	export const Authorization = StateAuthorization
	export type Card = StateCard
	export const Card = StateCard
	export type Transaction = StateTransaction
	export const Transaction = StateTransaction
}
