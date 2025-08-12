import { isoly } from "isoly"
import { Supplier } from "../../Supplier"
import { Warning } from "../../Warning"
import { Balance } from "../Balance"

export interface Fiat {
	supplier: Supplier | "total"
	account: string
	timestamp: isoly.DateTime
	type: "safeguarded" | "unsafe" | "other" | "buffer"
	balances: Balance
	warnings?: Warning.Snapshot[]
	counterbalance?: Balance
	conditions?: { minimum?: Balance }
	label?: string
	reference?: string
}
