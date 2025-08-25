import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"
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
		test: ["paxgiro", "paxgiroCredit"],
		uk: ["bankingcircle", "clearbank"],
	}
	export const presets: Record<Supplier, Card.Preset[]> = {
		paxgiro: ["test-pg-150", "test-pg-200", "test-ta-mc-200", "test-ta-pg-200"],
		clearbank: [
			"p2p-mc-200",
			"p2p-visa-bid-115",
			"p2p-visa-bp-140",
			"p2p-visa-cdd-185",
			"p2p-visa-idx-140",
			"p2p-visa-idx-160",
			"p2p-visa-idx-200",
			"p2p-diners-175",
			"p2p-diners-200",
		],
		bankingcircle: ["test-pg-bc-200"],
		paxgiroCredit: [],
	}
}
