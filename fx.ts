import { isoly } from "isoly"

export namespace fx {
	export interface Quote extends Quote.Creatable {
		id: string
		created: isoly.DateTime
		expires: isoly.DateTime
		to: { amount: number; currency: isoly.Currency }
		rate: {
			base: number
			markup: number
			effective: number
		}
	}
	export namespace Quote {
		export interface Creatable {
			from: { currency: isoly.Currency; amount: number }
			to: { currency: isoly.Currency }
		}
	}
}
