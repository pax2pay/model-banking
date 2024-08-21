import { isoly } from "isoly"
import { Supplier } from "../../Supplier"
import { Balance } from "../Balance"
import { Warning } from "./Warning"

export interface Fiat {
	supplier: Supplier | "total"
	account: string
	timestamp: isoly.DateTime
	type: "safeguarded" | "unsafe" | "other" | "buffer"
	balances: Balance
	warnings?: Warning[]
}
