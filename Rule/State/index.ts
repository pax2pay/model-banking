import { Account as ModelAccount } from "../../Account"
import { Authorization as ModelAuthorization } from "../../Authorization"
import { Card as ModelCard } from "../../Card"
import { Transaction as ModelTransaction } from "../../Transaction"
import { Account as StateAccount } from "./Account"
import { Authorization as StateAuthorization } from "./Authorization"
import { Card as StateCard } from "./Card"
import { Transaction as StateTransaction } from "./Transaction"

export interface State {
	account: State.Account
	authorization?: State.Authorization
	card?: State.Card
	transaction: State.Transaction
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
	export namespace Account {
		export const from = StateAccount.from
		export const type = StateAccount.type
		export const is = StateAccount.is
		export const flaw = StateAccount.flaw
	}
	export type Authorization = StateAuthorization
	export namespace Authorization {
		export const from = StateAuthorization.from
		export const type = StateAuthorization.type
		export const is = StateAuthorization.is
		export const flaw = StateAuthorization.flaw
	}
	export type Card = StateCard
	export namespace Card {
		export const from = StateCard.from
		export const type = StateCard.type
		export const is = StateCard.is
		export const flaw = StateCard.flaw
	}
	export type Transaction = StateTransaction
	export namespace Transaction {
		export const from = StateTransaction.from
		export const is = StateTransaction.is
	}
}
