import { isoly } from "isoly"
import { isly } from "isly"
import { Changeable } from "../Changeable"

export interface Change {
	type: "change"
	from: Changeable
	created: isoly.DateTime
}

export namespace Change {
	export const type = isly.object<Change>({
		type: isly.string("change"),
		from: Changeable.type,
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
}
