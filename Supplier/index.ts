import { isly } from "isly"

export type Supplier = typeof Supplier.names[number]

export namespace Supplier {
	export const names = ["paxgiro", "clearbank", "paxgiro-credit"] as const
	export const type = isly.string<Supplier>(names)
	export const is = type.is
}
