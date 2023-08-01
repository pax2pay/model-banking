import { Account } from "./Account"
import { Authorization } from "./Authorization"
import { Card } from "./Card"
import { Transaction } from "./Transaction"

export interface State {
	transaction: Transaction
	account: Account
	authorization?: Authorization
	card?: Card
}
