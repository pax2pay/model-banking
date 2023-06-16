import { isoly } from "isoly"
import { isly } from "isly"

export interface Authorization {
	type: "authorization"
	status: "created" | "approved" | "declined"
	reason?: string
	created: isoly.DateTime
}

export namespace Authorization {
	export const type = isly.object<Authorization>({
		type: isly.string("authorization"),
		status: isly.union(isly.string("created"), isly.string("approved"), isly.string("declined")),
		reason: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
}
