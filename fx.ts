import { isoly } from "isoly"

export namespace fx {
	export interface Quote extends Quote.Creatable {
		id: string
		created: isoly.DateTime
		expires: isoly.DateTime
		to: { amount: number; currency: isoly.Currency }
		markup: number
		rate: {
			effective: number
			reference: number
		}
	}
	export namespace Quote {
		export interface Creatable {
			from: { currency: isoly.Currency; amount: number }
			to: { currency: isoly.Currency }
		}
	}
}
