import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Settlement } from "../Settlement"
import { Changes } from "./Changes"

export interface Creatable {
	account: cryptly.Identifier
	currency: isoly.Currency
	changes: Changes
	type: Creatable.Type
	counterbalance?: Creatable.Counterbalance
}
export namespace Creatable {
	export interface Counterbalance {
		code: string /* like: "uk-bc-safe02" */
		amount: number
	}
	export namespace Counterbalance {
		export const type = isly.object<Counterbalance>({ code: isly.string(), amount: isly.number() })
	}
	export const types = [
		"incoming",
		"finalizeIncoming",
		"outgoing",
		"finalizeOutgoing",
		"authorization",
		"capture",
		"charge",
		"refund",
		"cancel",
		"remove",
		"collect",
		"manual",
		"fund",
		"legacy",
		"adjustBuffer",
	] as const
	export type Type = (typeof types)[number]
	export const type = isly.object<Creatable>({
		account: isly.fromIs("cryptly.Identifier", cryptly.Identifier.is),
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		changes: Changes.type,
		type: isly.string(types),
		counterbalance: Counterbalance.type.optional(),
	})
	export function fromRefund(account: string, settlement: string, entry: Settlement.Entry.Creatable.Refund): Creatable {
		// The Entry.Refund.Creatable has negative amount and fee
		// The operation amounts should always be positive
		const [currency, entryAmount] = entry.amount
		const operationNet = Math.abs(entryAmount)
		const operationFee = Math.abs(entry.fee.other[currency] ?? 0)
		return {
			account: account,
			currency,
			type: "refund",
			changes: {
				"reserved-incoming": {
					type: "add",
					amount: isoly.Currency.add(currency, operationNet, operationFee),
					status: "pending",
				},
				[`${settlement}-net`]: {
					type: "subtract" as const,
					amount: operationNet,
					status: "pending" as const,
				},
				[`${settlement}-fee`]: {
					type: "subtract" as const,
					amount: operationFee,
					status: "pending" as const,
				},
			},
		}
	}
}
