import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../Amount"

export interface Capture {
	type: "capture"
	created: isoly.DateTime
	total: Amount
	net: Amount
	fee: Amount
	charge?: Amount
}
export namespace Capture {
	export const type = isly.object<Capture>({
		type: isly.string("capture"),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		amount: Amount.type,
		charge: Amount.type,
	})
}
