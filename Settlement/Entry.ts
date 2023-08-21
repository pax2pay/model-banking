import { isoly } from "isoly"
import { isly } from "isly"
import { Acquirer } from "../Acquirer"
import { Merchant } from "../Merchant"

export type Entry = Succeeded | Failed

export interface Succeeded {
	status: "succeeded"
	type: "capture" | "cancel" | "refund"
	account: string
	card: { id: string; token: string; iin: string; last4: string }
	authorization: string
	transaction: { id: string; posted: isoly.DateTime; description: string }
	amount: [isoly.Currency, number]
	fee: [isoly.Currency, number]
	merchant: Merchant
	acquirer: Acquirer
}
export interface Failed {
	status: "failed"
	type?: "capture" | "cancel" | "refund"
	account?: string
	card?: { id: string; token: string; iin: string; last4: string }
	authorization?: string
	transaction?: { id: string; posted: isoly.DateTime; description: string }
	amount?: [isoly.Currency, number]
	fee?: [isoly.Currency, number]
	reason?: string
	data?: any
}
export namespace Entry {
	export namespace Succeeded {
		export const type = isly.object<Succeeded>({
			status: isly.string("succeeded"),
			type: isly.union(isly.string("capture"), isly.string("cancel"), isly.string("refund")),
			account: isly.string(),
			card: isly.object<{ id: string; token: string; iin: string; last4: string }>({
				id: isly.string(),
				token: isly.string(),
				iin: isly.string(),
				last4: isly.string(),
			}),
			authorization: isly.string(),
			transaction: isly.object<{ id: string; posted: string; description: string }>({
				id: isly.string(),
				posted: isly.fromIs("transaction.posted", isoly.DateTime.is),
				description: isly.string(),
			}),
			amount: isly.tuple(isly.fromIs("Entry.amount", isoly.Currency.is), isly.number()),
			fee: isly.tuple(isly.fromIs("Entry.fee", isoly.Currency.is), isly.number()),
			merchant: Merchant.type,
			acquirer: Acquirer.type,
		})
		export const is = type.is
	}
	export namespace Failed {
		export const type = isly.object<Failed>({
			status: isly.string("failed"),
			type: isly.union(isly.string("capture"), isly.string("cancel"), isly.string("refund")).optional(),
			account: isly.string().optional(),
			card: isly
				.object<{ id: string; token: string; iin: string; last4: string }>({
					id: isly.string(),
					token: isly.string(),
					iin: isly.string(),
					last4: isly.string(),
				})
				.optional(),
			authorization: isly.string().optional(),
			transaction: isly
				.object<{ id: string; posted: string; description: string }>({
					id: isly.string(),
					posted: isly.fromIs("transaction.posted", isoly.DateTime.is),
					description: isly.string(),
				})
				.optional(),
			amount: isly.tuple(isly.fromIs("Entry.amount", isoly.Currency.is), isly.number()).optional(),
			fee: isly.tuple(isly.fromIs("Entry.fee", isoly.Currency.is), isly.number()).optional(),
			reason: isly.string().optional(),
			data: isly.any().optional(),
		})
		export const is = type.is
	}
	export const type = isly.union<Entry, Succeeded, Failed>(Succeeded.type, Failed.type)
	export const is = type.is
}
