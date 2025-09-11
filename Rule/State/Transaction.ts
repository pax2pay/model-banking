import { isoly } from "isoly"
import { Account as ModelAccount } from "../../Account"
import { Transaction as ModelTransaction } from "../../Transaction"
import type { Rule } from "../index"

export type Transaction = ModelTransaction.Creatable.Resolved & {
	id: string
	kind: Rule.Base.Kind
	stage: "finalize" | "initiate"
	amount: number
	type: ModelTransaction.Types
	original: {
		currency: isoly.Currency
		total: number
		amount: number
	}
}
export namespace Transaction {
	export function from(
		account: ModelAccount,
		transaction: ModelTransaction.Creatable.Resolved | ModelTransaction,
		kind: Rule.Base.Kind,
		stage: "finalize" | "initiate"
	): Transaction {
		const amount = Math.abs(typeof transaction.amount == "number" ? transaction.amount : transaction.amount.original)
		return {
			...transaction,
			id: "id" in transaction ? transaction.id : ModelTransaction.Identifier.generate(),
			stage,
			kind,
			amount,
			type: ModelTransaction.getType(transaction.counterpart, account.name),
			original: {
				currency: transaction.currency,
				amount,
				total: amount,
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
			id: "id" in transaction ? transaction.id : ModelTransaction.Identifier.generate(),
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
