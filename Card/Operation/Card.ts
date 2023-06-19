import { isoly } from "isoly"
import { isly } from "isly"
import { Changeable } from "../Changeable"

export interface Card {
	type: "card"
	status: "create" | "change" | "cancel"
	from?: Changeable
	created: isoly.DateTime
}

export namespace Card {
	export const type = isly.object<Card>({
		type: isly.string("card"),
		status: isly.union(isly.string("create"), isly.string("change"), isly.string("cancel")),
		from: Changeable.type.optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
}
