import { isly } from "isly"
import { Amount } from "../Amount"

export type Exchange = Exchange.From | Exchange.To
export namespace Exchange {
	export interface From {
		type: "from"
		rate: number
		from: Amount
	}
	export const From = isly.object<From>({ rate: isly.number(), from: Amount.type, type: isly.string("from") })
	export interface To {
		type: "to"
		rate: number
		to: Amount
		quote: string
	}
	export const To = isly.object<To>({
		rate: isly.number(),
		to: Amount.type,
		quote: isly.string(),
		type: isly.string("to"),
	})
	export const type = isly.union<Exchange, From, To>(From, To)
}
