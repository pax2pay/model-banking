import { isoly } from "isoly"
import { isly } from "isly"
import { Changeable } from "../Changeable"

export interface Change {
	type: "change"
	created: isoly.DateTime
	from?: Changeable
	to?: Changeable
}
export namespace Change {
	export const type = isly.object<Change>({
		type: isly.string("change"),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		from: Changeable.type.optional(),
		to: Changeable.type.optional(),
	})
}
