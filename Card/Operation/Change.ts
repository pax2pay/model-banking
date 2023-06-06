import * as isoly from "isoly"
import { isly } from "isly"
import { Changable } from "../Changable"

export interface Change {
	type: "change"
	from: Changable
	created: isoly.DateTime
}

export namespace Change {
	export const type = isly.object<Change>({
		type: isly.string("change"),
		from: Changable.type,
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
}
