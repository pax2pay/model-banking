import { Base } from "./Base"

export interface LedgerIntegrity extends Base {
	check: "ledger integrity"
	failed: string[]
	incomplete: string[]
	passed: number
	total: number
}
export namespace LedgerIntegrity {}
