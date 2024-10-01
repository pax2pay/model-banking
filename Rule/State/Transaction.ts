import { isoly } from "isoly"
import type { Address } from "../../Rail/Address"
import { Transaction as ModelTransaction } from "../../Transaction"
import type { Rule } from "../index"

export interface Transaction extends ModelTransaction.Creatable {
	kind: Rule.Base.Kind
	stage: "finalize" | "initiate"
	amount: number
	type: ModelTransaction.Types
	risk?: number
	original: {
		currency: isoly.Currency
		total: number
		amount: number
		charge?: { current: number; total: number }
		reserve?: number
	}
}
export namespace Transaction {
	export function from(
		accountName: string,
		transaction: ModelTransaction.Creatable & { counterpart: Address },
		kind: Rule.Base.Kind,
		stage: "finalize" | "initiate"
	): Transaction {
		return {
			...transaction,
			stage,
			kind,
			amount: Math.abs(transaction.amount),
			type: ModelTransaction.getType(transaction.counterpart, accountName),
			original: {
				currency: transaction.currency,
				amount: Math.abs(transaction.amount),
				total: Math.abs(transaction.amount),
			},
		}
	}
}
