import { isoly } from "isoly"
import { isly } from "isly"

export interface Entry {
	status: "succeeded" | "failed"
	type: "capture" | "cancel" | "refund"
	account: string
	card: string
	transaction: string
	amount: [isoly.Currency, number]
	fee: [isoly.Currency, number]
}
export namespace Entry {
	export const type = isly.object<Entry>({
		status: isly.string(),
		type: isly.string(),
		account: isly.string(),
		card: isly.string(),
		transaction: isly.string(),
		amount: isly.tuple(isly.fromIs("Entry.amount", isoly.Currency.is), isly.number()),
		fee: isly.tuple(isly.fromIs("Entry.fee", isoly.Currency.is), isly.number()),
	})
}
