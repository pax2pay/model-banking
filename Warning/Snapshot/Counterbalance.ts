import { isoly } from "isoly"
import { isly } from "isly"
import { Base } from "../Base"

export interface Counterbalance extends Base {
	type: "counterbalance"
	severity?: "low"
	currency: isoly.Currency
}
export namespace Counterbalance {
	export const type = Base.type.extend<Counterbalance>({
		type: isly.string("counterbalance"),
		severity: isly.string("low").optional(),
		currency: isly.string(),
	})
}
