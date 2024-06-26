import { isoly } from "isoly"
import { Balances } from "../../Balances"
import { Counterbalances } from "../../Counterbalances"

export interface Emoney {
	organization: string
	account: string
	timestamp: isoly.DateTime
	balances: Balances
	counterbalances: Counterbalances
}
