import { isoly } from "isoly"
import type { Address } from "../../Rail/Address"
import { Transaction as ModelTransaction } from "../../Transaction"
import type { Rule } from "../index"

export interface Transaction extends ModelTransaction.Creatable {
	kind: Rule.Base.Kind
	amount: number
	type: ModelTransaction.Types
	risk?: number
	original: { currency: isoly.Currency; amount: number; charge?: number; total?: number }
}
export namespace Transaction {
	export function from(
		accountName: string,
		transaction: ModelTransaction.Creatable & { counterpart: Address },
		kind: Rule.Base.Kind
	): Transaction {
		return {
			...transaction,
			kind,
			amount: Math.abs(transaction.amount),
			type: ModelTransaction.getType(transaction.counterpart, accountName),
			original: { currency: transaction.currency, amount: Math.abs(transaction.amount) },
		}
	}
}
