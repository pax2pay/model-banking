import { isoly } from "isoly"

export namespace fx {
	export interface Quote {
		id: string
		created: isoly.DateTime
		expires: isoly.DateTime
		from: { currency: isoly.Currency; amount: number }
		to: { amount: number; currency: isoly.Currency }
		rate: {
			base: number
			markup: number
			effective: number
		}
	}
	export namespace Quote {
		export interface Creatable {
			type: "sell" | "buy"
			from: isoly.Currency
			to: isoly.Currency
			amount: number
		}
	}
}
