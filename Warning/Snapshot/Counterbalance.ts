import { isoly } from "isoly"
import { isly } from "isly"
import { Base } from "../Base"

export interface Counterbalance extends Base {
	type: "counterbalance"
	account: string
	currency: isoly.Currency
	counterbalance: string[]
}
export namespace Counterbalance {
	export const type = Base.type.extend<Counterbalance>({
		type: isly.string("counterbalance"),
		account: isly.string(),
		currency: isly.string(),
		counterbalance: isly.string().array(),
	})
}
