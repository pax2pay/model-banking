import { isoly } from "isoly"
import { Transaction } from "../Transaction"

export interface Funding {
	created: isoly.DateTime
	transactions: Transaction[]
	currency: isoly.Currency
	balance: number
}
