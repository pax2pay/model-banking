import { isoly } from "isoly"
import { Base } from "./Base"
import { Result } from "./Result"

export interface BankFeedIntegrity extends Base {
	check: "bank feed integrity"
	accounts: {
		code: string
		reference: string
		supplier: string
		opening?: { at: isoly.DateTime; balance: number }
		transaction?: { balance: number }
		closing: { at: isoly.DateTime; balance: number }
		timestamp: string
		result: Result
	}[]
}

export namespace BankFeedIntegrity {}
