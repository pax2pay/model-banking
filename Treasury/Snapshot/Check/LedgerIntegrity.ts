import { isoly } from "isoly"
import { Base } from "./Base"

export interface LedgerIntegrity extends Base {
	check: "ledger integrity"
	opening: { at: isoly.DateTime; balance: number }
	ledger: { change: number }
	closing: { at: isoly.DateTime; balance: number }
	failed: string[]
	incomplete: string[]
	passed: number
	total: number
}
export namespace LedgerIntegrity {}
