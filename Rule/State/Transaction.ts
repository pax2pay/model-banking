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
		transaction: (ModelTransaction.Creatable & { counterpart: Address }) | ModelTransaction,
		kind: Rule.Base.Kind,
		stage: "finalize" | "initiate"
	): Transaction {
		const [amount, total] =
			"state" in transaction
				? [
						transaction.state?.transaction.original.amount ?? transaction.amount,
						isoly.Currency.subtract(
							transaction.currency,
							transaction.state?.transaction.original.total ?? transaction.amount,
							stage === "finalize" ? transaction.state?.transaction.original.reserve ?? 0 : 0
						),
				  ]
				: [transaction.amount, transaction.amount]
		return {
			...transaction,
			stage,
			kind,
			amount: Math.abs(amount),
			type: ModelTransaction.getType(transaction.counterpart, accountName),
			original: {
				currency: transaction.currency,
				amount: Math.abs(amount),
				total: Math.abs(total),
			},
		}
	}
}
