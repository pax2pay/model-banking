import * as isoly from "isoly"
import { isly } from "isly"

export interface Cancel {
	type: "cancel"
	created: isoly.DateTime
}

export namespace Cancel {
	export const type = isly.object<Cancel>({
		type: isly.string("cancel"),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
}
