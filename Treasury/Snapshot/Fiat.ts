import { isoly } from "isoly"
import { Supplier } from "../../Supplier"
import { Balance } from "../Balance"

export interface Fiat {
	supplier: Supplier
	account: string
	timestamp: isoly.DateTime
	type: "safeguarded" | "unsafe" | "other" | "buffer"
	balances: Balance
	conditions?: { minimum?: Balance }
	label?: string
	reference: string
	description?: string
}
