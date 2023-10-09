import type { Transaction as ModelTransaction } from "../../Transaction"

export type Transaction = ModelTransaction.Creatable

export namespace Transaction {
	export function from(transaction: ModelTransaction.Creatable): Transaction {
		return transaction
	}
}
