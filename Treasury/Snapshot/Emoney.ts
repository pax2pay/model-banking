import { isoly } from "isoly"
import { Balances } from "../../Balances"
import { Counterbalances } from "../../Counterbalances"
import { Supplier } from "../../Supplier"

export interface Emoney {
	organization: string
	account: string
	supplier?: Supplier
	timestamp: isoly.DateTime
	balances: Balances
	counterbalances: Counterbalances
}
