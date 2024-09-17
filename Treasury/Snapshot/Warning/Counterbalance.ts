import { isoly } from "isoly"
import { isly } from "isly"

export interface Counterbalance {
	type: "counterbalance"
	account: string
	currency: isoly.Currency
	counterbalance: string[]
}
export namespace Counterbalance {
	export const type = isly.object<Counterbalance>({
		type: isly.string("counterbalance"),
		account: isly.string(),
		currency: isly.string(),
		counterbalance: isly.string().array(),
	})
}
