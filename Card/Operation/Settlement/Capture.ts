import { isoly } from "isoly"
import { isly } from "isly"

export interface Capture {
	type: "settlement.capture"
	created: isoly.DateTime
}

export namespace Capture {
	export const type = isly.object<Capture>({
		type: isly.string("settlement.capture"),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
}
