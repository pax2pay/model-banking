import { isoly } from "isoly"
import { Balances } from "../../Balances"
import { Counterbalances2 } from "../../Counterbalances2"

export interface Emoney {
	organization: string
	account: string
	timestamp: isoly.DateTime
	balances: Balances
	counterbalances: Counterbalances2
}
