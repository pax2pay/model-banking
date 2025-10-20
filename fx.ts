import { isoly } from "isoly"
import { isly } from "isly"

export namespace fx {
	export interface Quote {
		type: "sell" | "buy"
		id: string
		created: isoly.DateTime
		expires: isoly.DateTime
		markup: number // percent
		from: { amount: number; currency: isoly.Currency }
		to: { amount: number; currency: isoly.Currency }
		rates: {
			bid: { base: number; markup: number; effective: number }
			// For transparency, probably not needed? "ask" = what you would get back if you reversed the trade
			// Why we might need this: "base" is not a reference/spot rate, it's Banking Circle's bid/ask rates.
			ask: { base: number; markup: number; effective: number }
			// Spot rates would require another service call and cost time.
			spotPrice?: number
		}
	}
	const base = 11.08
	const markup = 0.01
	const markupRate = base * markup
	export const bid = {
		rate: {
			base, //11.08
			markup: markupRate, // 0.1108
			effective: base + markupRate, // 11.1908
		},
	}

	export namespace Quote {
		export type Creatable3 =
			| {
					from: { amount: number; currency: isoly.Currency }
					to: isoly.Currency
			  }
			| {
					from: isoly.Currency
					to: { amount: number; currency: isoly.Currency }
			  }
		export type Creatable2 =
			| { type: "sell"; bid: { from: isoly.Currency; to: isoly.Currency; amount: number } }
			| { type: "buy"; from: isoly.Currency; to: isoly.Currency; amount: number }
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
