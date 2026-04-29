import { Base } from "./Base"

export interface TransactionMatch extends Base {
	check: "transaction match"
	total: number
	matched: number
	unmatched: string[]
}
export namespace TransactionMatch {}
