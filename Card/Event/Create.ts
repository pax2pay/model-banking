import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../Amount"

export interface Create {
	type: "create"
	created: isoly.DateTime
	limit: Amount
}
export namespace Create {
	export const type = isly.object<Create>({
		type: isly.string("create"),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		limit: Amount.type,
	})
}
