import { isoly } from "isoly"
import { isly } from "isly"

export namespace fx {
	export interface Quote {
		id: string
		created: isoly.DateTime
		expires: isoly.DateTime
		from: { amount: number; currency: isoly.Currency }
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
		export namespace Creatable {
			export const type = isly.object<Creatable>({
				type: isly.string(["sell", "buy"]),
				from: isly.fromIs("isoly.Currency", isoly.Currency.is),
				to: isly.fromIs("isoly.Currency", isoly.Currency.is),
				amount: isly.number(),
			})
		}
	}
}
