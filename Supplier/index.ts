import { isoly } from "isoly"
import { isly } from "isly"

export type Supplier = typeof Supplier.names[number]
export namespace Supplier {
	export const names = ["paxgiro", "clearbank", "bankingcircle", "paxgiroCredit"] as const
	export const type = isly.string<Supplier>(names)
	export const currencies: Record<Supplier, isoly.Currency[]> = {
		clearbank: ["GBP"],
		paxgiro: ["GBP", "SEK", "USD", "EUR"],
		paxgiroCredit: ["GBP", "SEK", "USD", "EUR"],
	}
}
