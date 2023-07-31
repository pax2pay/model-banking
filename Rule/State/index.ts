import { Account } from "./Account"
import { Authorization } from "./Authorization"
import { Card } from "./Card"
import { Transaction } from "./Transaction"

export interface State {
	authorization: Authorization
	transaction: Transaction
	account: Account
	card: Card
}
