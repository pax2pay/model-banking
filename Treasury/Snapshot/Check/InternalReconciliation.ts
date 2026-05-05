import { isoly } from "isoly"
import { Emoney } from "../Emoney"
import { Base as ResultBase } from "./Base"

export interface InternalReconciliation extends ResultBase {
	check: "internal reconciliation"
	counterbalance: number
	emoney: number
	discrepancy: number
	accounts: InternalReconciliation.Account[]
}
export namespace InternalReconciliation {
	export interface Account extends Omit<Emoney, "balances"> {
		balance: number
		currency: isoly.Currency
	}
}
