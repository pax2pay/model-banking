import { isoly } from "isoly"
import { isly } from "isly"

export interface Create {
	type: "create"
	created: isoly.DateTime
}

export namespace Create {
	export const type = isly.object<Create>({
		type: isly.string("create"),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
}
