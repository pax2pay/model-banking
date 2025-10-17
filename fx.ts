import { isoly } from "isoly"
import { isly } from "isly"

export namespace fx {
	export interface Quote {
		id: string
		created: isoly.DateTime
		expires: isoly.DateTime
		from: { amount: number; currency: isoly.Currency }
		to: { amount: number; currency: isoly.Currency }
		bid: {
			markup: number // percent
			price: { base: number; effective: number } // "price" = `${from.currency} per ${to.currency}`
			volume: { base: number; effective: number } // "volume" = `${to.currency} per ${from.currency}`
		}
		// For transparency, probably not needed? "ask" = what you would get back if you reversed the trade
		// Why we might need this: "base" is not a reference/spot rate, it's Banking Circle's bid/ask rates.
		// Accurate and relevant spot rates are hard to get, would require another service call and cost time.
		ask: {
			markup: number
			price: { base: number; effective: number } // "price" = `${to.currency} per ${from.currency}`
			volume: { base: number; effective: number } // "volume" = `${from.currency} per ${to.currency}`
		}
	}
	export namespace Quote {
		export interface Creatable {
			type: "sell" | "buy"
			from: isoly.Currency
			to: isoly.Currency
			amount: number
		}
		export namespace Creatable {
			export const type = isly.object<Creatable>({
				type: isly.string(["sell", "buy"]),
				from: isly.string(isoly.Currency.values),
				to: isly.string(isoly.Currency.values),
				amount: isly.number(),
			})
		}
	}
}
