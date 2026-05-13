import { isoly } from "isoly"
import { Balances } from "../../Balances"
import { Supplier } from "../../Supplier"

export interface Emoney {
	organization: string
	account: string
	supplier?: Supplier
	currencies?: isoly.Currency[]
	timestamp: isoly.DateTime
	balances: Balances
}
