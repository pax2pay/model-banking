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
}

export namespace Creatable {
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
	export type Type = typeof types[number]
	export const type = isly.object<Creatable>({
		account: isly.fromIs("cryptly.Identifier", cryptly.Identifier.is),
		currency: isly.fromIs("isoly.Currency", isoly.Currency.is),
		changes: Changes.type,
		type: isly.string(types),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function fromRefund(
		account: string,
		settlement: string,
		entry: Settlement.Entry.Refund.Creatable,
		charge: number
	): Creatable {
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
				...(charge > 0 && {
					[`${settlement}-charge`]: {
						type: "add" as const,
						amount: charge,
						status: "pending" as const,
					},
					available: {
						type: "subtract" as const,
						amount: charge,
						status: "pending" as const,
					},
				}),
			},
		}
	}
}
