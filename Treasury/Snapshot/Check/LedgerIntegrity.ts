import { Base } from "./Base"

export interface LedgerIntegrity extends Base {
	check: "ledger integrity"
	opening: { balance: number }
	ledger: { change: number }
	closing: { balance: number }
	failed: string[]
	incomplete: string[]
	passed: number
	total: number
}
export namespace LedgerIntegrity {}
