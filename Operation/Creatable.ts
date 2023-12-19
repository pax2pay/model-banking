import * as cryptly from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"
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
		"legacy",
		"collect",
		"deposit",
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
	export function fromRefund(account: string, entry: Settlement.Entry.Refund.Creatable, stack: Card.Stack): Creatable {
		const [currency, amount] = entry.amount
		return {
			account: account,
			currency,
			type: "refund",
			changes: {
				actual: {
					type: "add",
					amount: isoly.Currency.add(currency, amount, entry.fee.other[currency] ?? 0),
					status: "pending",
				},
				incomingReserved: {
					type: "add",
					amount: isoly.Currency.add(currency, amount, entry.fee.other[currency] ?? 0),
					status: "pending",
				},
				[`fee_${stack}_${entry.batch}`]: {
					type: "subtract" as const,
					amount: entry.fee.other[currency] ?? 0,
					status: "pending" as const,
				},
				[`settle_${stack}_${entry.batch}`]: {
					type: "subtract" as const,
					amount: amount,
					status: "pending" as const,
				},
			},
		}
	}
}
