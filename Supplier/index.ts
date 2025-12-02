import { isoly } from "isoly"
import { isly } from "isly"
import { Realm } from "../Realm"

export type Supplier = typeof Supplier.names[number]
export namespace Supplier {
	export const names = ["paxgiro", "clearbank", "bankingcircle", "paxgiroCredit"] as const
	export const type = isly.string<Supplier>(names)
	export const currencies: Record<Realm, Partial<Record<Supplier, isoly.Currency[]>>> = {
		eea: {},
		uk: {
			clearbank: ["GBP"],
			bankingcircle: ["EUR", "GBP", "USD", "DKK", "CHF", "PLN", "SEK", "HUF"],
		},
		uguk: {
			bankingcircle: ["EUR", "GBP", "USD", "DKK", "CHF", "PLN", "SEK", "NOK"],
		},
		test: {
			paxgiro: ["GBP", "SEK", "USD", "EUR"],
			bankingcircle: ["EUR", "GBP", "USD", "DKK", "CHF", "PLN", "SEK", "HUF"],
		},
	}
	export const realm = {
		eea: [],
		test: ["paxgiro", "bankingcircle"],
		uk: ["clearbank", "bankingcircle"],
		uguk: ["bankingcircle"],
	// eslint-disable-next-line prettierx/options
	} as const satisfies Record<Realm, Supplier[]>
}
