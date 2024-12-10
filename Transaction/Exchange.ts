import { isly } from "isly"
import { Amount } from "../Amount"

export interface Exchange {
	rate: number
	from: Amount
}
export namespace Exchange {
	export const type = isly.object<Exchange>({
		rate: isly.number(),
		from: Amount.type,
	})
}
