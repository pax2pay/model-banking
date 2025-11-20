import { isoly } from "isoly"
import { isly } from "isly"
import { Charge } from "./Transaction/Amount/Charge"

export namespace fx {
	export interface Quote {
		id: string
		created: isoly.DateTime
		expires: isoly.DateTime
		account: { id: string; fx: { markup: number } }
		fixed: Quote.Fixed
		from: { amount: number; currency: isoly.Currency }
		to: { amount: number; currency: isoly.Currency }
		rate: { base: number; markup: number; effective: number }
	}
	export namespace Quote {
		export type Fixed = typeof Fixed.values[number]
		export namespace Fixed {
			export const values = ["from", "to"] as const
			export const type = isly.string<Fixed>(values)
		}
		export type Creatable = Creatable.From | Creatable.To
		export namespace Creatable {
			export interface From {
				from: { amount: number; currency: isoly.Currency }
				to: isoly.Currency
			}
			export namespace From {
				export const type = isly.object<From>({
					from: isly.object<From["from"]>({ currency: isly.string(isoly.Currency.values), amount: isly.number() }),
					to: isly.string(isoly.Currency.values),
				})
			}
			export interface To {
				from: isoly.Currency
				to: { amount: number; currency: isoly.Currency }
			}
			export namespace To {
				export const type = isly.object<To>({
					from: isly.string(isoly.Currency.values),
					to: isly.object<To["to"]>({ currency: isly.string(isoly.Currency.values), amount: isly.number() }),
				})
			}
			export const type = isly.union<Creatable, From, To>(From.type, To.type)
		}
		export function toCharge(quote: Quote): Charge {
			const withoutMarkup = isoly.Currency.round(
				isoly.Currency.divide(quote.to.currency, quote.to.amount, quote.rate.base),
				quote.from.currency
			)
			const charge = isoly.Currency.subtract(quote.from.currency, quote.from.amount, withoutMarkup)
			return { fx: { amount: charge, preset: "default", rate: quote.rate.markup } }
		}
	}
	export const type = isly.object<Quote>({
		id: isly.string(),
		created: isly.string(),
		expires: isly.string(),
		account: isly.object<Quote["account"]>({
			id: isly.string(),
			fx: isly.object<Quote["account"]["fx"]>({ markup: isly.number() }),
		}),
		fixed: Quote.Fixed.type,
		from: isly.object<Quote["from"]>({ amount: isly.number(), currency: isly.string(isoly.Currency.values) }),
		to: isly.object<Quote["to"]>({ amount: isly.number(), currency: isly.string(isoly.Currency.values) }),
		rate: isly.object<Quote["rate"]>({ base: isly.number(), markup: isly.number(), effective: isly.number() }),
	})
}
