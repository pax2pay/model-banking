import { isoly } from "isoly"
import { isly } from "isly"

export interface Refund {
	type: "settlement.refund"
	created: isoly.DateTime
}

export namespace Refund {
	export const type = isly.object<Refund>({
		type: isly.string("settlement.refund"),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
}
