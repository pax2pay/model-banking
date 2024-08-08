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
		"refund",
		"cancel",
		"remove",
		"collect",
		"manual",
		"fund",
		"legacy",
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
	export function fromRefund(account: string, entry: Settlement.Entry.Refund.Creatable): Creatable {
		// The Entry.Refund.Creatable has negative amount and fee
		// The operation amounts should always be positive
		const [currency, entryAmount] = entry.amount
		const operationAmount = Math.abs(entryAmount)
		const operationFee = Math.abs(entry.fee.other[currency] ?? 0)
		return {
			account: account,
			currency,
			type: "refund",
			changes: {
				actual: {
					type: "add",
					amount: isoly.Currency.add(currency, operationAmount, operationFee),
					status: "pending",
				},
				incomingReserved: {
					type: "add",
					amount: isoly.Currency.add(currency, operationAmount, operationFee),
					status: "pending",
				},
			},
		}
	}
}
