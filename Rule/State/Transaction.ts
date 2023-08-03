import type { Transaction as ModelTransaction } from "../../Transaction"

export type Transaction = ModelTransaction

export namespace Transaction {
	export function from(transaction: ModelTransaction): Transaction {
		return transaction
	}
}
