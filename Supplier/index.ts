import { isoly } from "isoly"
import { isly } from "isly"
import { Realm } from "../Realm"

export type Supplier = typeof Supplier.names[number]
export namespace Supplier {
	export const names = ["paxgiro", "clearbank", "bankingcircle", "paxgiroCredit"] as const
	export const type = isly.string<Supplier>(names)
	export const currencies: Record<Supplier, isoly.Currency[]> = {
		clearbank: ["GBP"],
		bankingcircle: ["EUR", "GBP", "USD", "DKK", "CHF", "PLN", "SEK", "HUF"],
		paxgiro: ["GBP", "SEK", "USD", "EUR"],
		paxgiroCredit: ["GBP", "SEK", "USD", "EUR"],
	}
	export const realm: Record<Realm, Supplier[]> = {
		eea: [],
		test: ["paxgiro", "bankingcircle"],
		uk: ["clearbank", "bankingcircle"],
		uguk: ["bankingcircle"],
	}
}
