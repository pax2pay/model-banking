import { isoly } from "isoly"
import type { Transaction as ModelTransaction } from "../../Transaction"
import { Rule } from "../Rule"

export interface Transaction extends Omit<ModelTransaction.Creatable, "currency" | "amount"> {
	kind: Rule.Base.Kind
	amount: number
	risk?: number
	original: { currency: isoly.Currency; amount: number }
}
export namespace Transaction {
	export function from(transaction: ModelTransaction.Creatable, kind: Rule.Base.Kind): Transaction {
		return {
			...transaction,
			kind,
			amount: Math.abs(transaction.amount),
			original: { currency: transaction.currency, amount: Math.abs(transaction.amount) },
		}
	}
}
