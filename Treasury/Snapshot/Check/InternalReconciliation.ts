import { Base as ResultBase } from "./Base"

export interface InternalReconciliation extends ResultBase {
	check: "internal reconciliation"
	counterbalance?: number
	emoney: number
	discrepancy: number
}
export namespace InternalReconciliation {}
