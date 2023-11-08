import type { Transaction as ModelTransaction } from "../../Transaction"

export interface Transaction extends Omit<ModelTransaction.Creatable, "currency" | "amount"> {
	amount: number
	original: { currency: string; amount: number }
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
