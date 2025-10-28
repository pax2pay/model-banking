import { isly } from "isly"
import { Amount } from "../Amount"

export type Exchange = Exchange.From | Exchange.To
export namespace Exchange {
	export interface From {
		rate: number
		from: Amount
	}
	export const From = isly.object<From>({ rate: isly.number(), from: Amount.type })
	export interface To {
		rate: number
		to: Amount
		quote?: string
	}
	export const To = isly.object<To>({ rate: isly.number(), to: Amount.type, quote: isly.string().optional() })
	export const type = isly.union<Exchange, From, To>(From, To)
}
