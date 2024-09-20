import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../Amount"

export interface Refund {
	type: "refund"
	created: isoly.DateTime
	total: Amount
	net: Amount
	fee: Amount
	charge?: Amount
}
export namespace Refund {
	export const type = isly.object<Refund>({
		type: isly.string("refund"),
		event: isly.string<Event>(events),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		amount: Amount.type,
		charge: Amount.type,
	})
}
