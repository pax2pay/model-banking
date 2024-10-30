import { isoly } from "isoly"
import { isly } from "isly"

export interface Clearing {
	type: Clearing.Type
	at: isoly.DateTime
	currency: isoly.Currency
	total: number
	net: number
	fee: number
	charge?: number
}
export namespace Clearing {
	export const types = ["capture", "refund"] as const
	export type Type = typeof types[number]
	export const type = isly.object<Clearing>({
		type: isly.string<Type>(types),
		at: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		currency: isly.string(),
		total: isly.number(),
		net: isly.number(),
		fee: isly.number(),
		charge: isly.number().optional(),
	})
}
