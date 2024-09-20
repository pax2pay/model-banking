import { isoly } from "isoly"
import { isly } from "isly"
import { Changeable } from "../Changeable"

export interface Create {
	type: "create"
	created: isoly.DateTime
}
export namespace Card {
	export const type = isly.object<Create>({
		type: isly.string("create"),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
}
