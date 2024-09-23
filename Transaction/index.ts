import { Private as TransactionPrivate } from "./Private"

export type Public = Pick<TransactionPrivate, typeof Transaction.values[number]>
export namespace Transaction {
	export import Private = TransactionPrivate
	export const values = [
		"counterpart",
		"currency",
		"amount",
		"charge",
		"description",
		"organization",
		"accountId",
		"accountName",
		"account",
		"id",
		"posted",
		"transacted",
		"by",
		"balance",
		"status",
		"rail",
	] as const
}
