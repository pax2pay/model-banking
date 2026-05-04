import { Base } from "./Base"

export interface ExternalReconciliation extends Base {
	check: "external reconciliation"
	counterbalance?: number
	fiat: number
	discrepancy: number
}
export namespace ExternalReconciliation {}
