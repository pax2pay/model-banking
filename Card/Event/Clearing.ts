import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../Amount"

export interface Clearing {
	type: Clearing.Type
	at: isoly.DateTime
	total: Amount
	net: Amount
	fee: Amount
	charge?: Amount
}
export namespace Clearing {
	export const types = ["capture", "refund"] as const
	export type Type = typeof types[number]
	export const type = isly.object<Clearing>({
		type: isly.string<Type>(types),
		at: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		total: Amount.type,
		net: Amount.type,
		fee: Amount.type,
		charge: Amount.type.optional(),
	})
}
