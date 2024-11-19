import { isly } from "isly"

export type Supplier = typeof Supplier.names[number]

export namespace Supplier {
	export const names = ["paxgiro", "clearbank", "paxgiroCredit"] as const
	export const type = isly.string<Supplier>(names)
}
