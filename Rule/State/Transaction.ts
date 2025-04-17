import { isoly } from "isoly"
import { Transaction as ModelTransaction } from "../../Transaction"
import type { Rule } from "../index"

export type Transaction = ModelTransaction.Creatable.Resolved & {
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
	}
}
export namespace Transaction {
	export function from(
		accountName: string,
		transaction: ModelTransaction.Creatable.Resolved | ModelTransaction,
		kind: Rule.Base.Kind,
		stage: "finalize" | "initiate"
	): Transaction {
		const [amount, total] =
			"state" in transaction
				? [
						transaction.state?.transaction.original.amount ?? transaction.amount,
						isoly.Currency.subtract(
							transaction.currency,
							transaction.state?.transaction.original.total ??
								(typeof transaction.amount == "number" ? transaction.amount : transaction.amount.total),
							stage === "finalize" ? transaction.state?.transaction.original.charge?.total ?? 0 : 0
						),
				  ]
				: [transaction.amount, transaction.amount]
		return {
			...transaction,
			stage,
			kind,
			amount: Math.abs(typeof amount == "number" ? amount : amount.total),
			type: ModelTransaction.getType(transaction.counterpart, accountName),
			original: {
				currency: transaction.currency,
				amount: Math.abs(typeof amount == "number" ? amount : amount.original),
				total: Math.abs(typeof total == "number" ? total : total.total),
			},
		}
	}
	export function fromPreTransaction(
		accountName: string,
		transaction: ModelTransaction.PreTransaction | ModelTransaction,
		kind: Rule.Base.Kind,
		stage: "finalize" | "initiate"
	): Transaction {
		return {
			...transaction,
			stage,
			kind,
			amount: Math.abs(typeof transaction.amount == "number" ? transaction.amount : transaction.amount.total),
			type: ModelTransaction.getType(transaction.counterpart, accountName),
			original: {
				currency: transaction.currency,
				amount: Math.abs(typeof transaction.amount == "number" ? transaction.amount : transaction.amount.original),
				total: Math.abs(typeof transaction.amount == "number" ? transaction.amount : transaction.amount.total),
			},
		}
	}
}
