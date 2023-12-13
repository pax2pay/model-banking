import { isoly } from "isoly"
import { isly } from "isly"
export interface Authorization {
	type: "authorization"
	id: string
	status: Authorization.Type
	reason?: string
	created: isoly.DateTime
}

export namespace Authorization {
	export const types = ["created", "confirmed", "cleared", "cancelled"] as const
	export type Type = typeof types[number]
	export const type = isly.object<Authorization>({
		type: isly.string("authorization"),
		id: isly.string(),
		status: isly.string(types),
		reason: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
}
