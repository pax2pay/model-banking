import { isoly } from "isoly"
import type { Transaction as ModelTransaction } from "../../Transaction"

type Risk = number // TODO More stuff
export interface Transaction extends Omit<ModelTransaction.Creatable, "currency" | "amount"> {
	amount: number
	risk?: Risk
	original: { currency: isoly.Currency; amount: number }
}
export namespace Transaction {
	export function from(transaction: ModelTransaction.Creatable): Transaction {
		return {
			...transaction,
			amount: Math.abs(transaction.amount),
			original: { currency: transaction.currency, amount: Math.abs(transaction.amount) },
		}
	}
}
