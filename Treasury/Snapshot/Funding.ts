import { isoly } from "isoly"
import { Transaction } from "../Transaction"

export interface Funding {
	created: isoly.DateTime
	period: isoly.TimeRange
	transactions: Transaction[]
	currency: isoly.Currency
	balance: { opening: number; closing: number }
}
