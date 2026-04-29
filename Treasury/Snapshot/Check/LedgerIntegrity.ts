import { isoly } from "isoly"
import { Base } from "./Base"
import { Result } from "./Result"

export interface LedgerIntegrity extends Base {
	check: "ledger integrity"
	accounts: {
		id: string
		organization: string
		timestamp: string
		opening?: { at: isoly.DateTime; balance: number }
		ledger?: { change: number }
		closing: { at: isoly.DateTime; balance: number }
		result: Result
	}[]
}
export namespace LedgerIntegrity {}
