import { isoly } from "isoly"
import { isly } from "isly"
import { Base } from "../Base"

export interface Counterbalance extends Base {
	type: "counterbalance"
	currency: isoly.Currency
}
export namespace Counterbalance {
	export const type = Base.type.extend<Counterbalance>({
		type: isly.string("counterbalance"),
		currency: isly.string(),
	})
}
