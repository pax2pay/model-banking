import { cryptly } from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
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
}
