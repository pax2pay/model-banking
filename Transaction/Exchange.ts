import { isly } from "isly"
import { Amount } from "../Amount"

export interface Exchange {
	rate: number
	to?: Amount
	from?: Amount
	quote?: string
}
export namespace Exchange {
	export const type = isly.object<Exchange>({
		rate: isly.number(),
		to: Amount.type.optional(),
		from: Amount.type.optional(),
		quote: isly.string().optional(),
	})
}
