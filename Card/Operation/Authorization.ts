import { isoly } from "isoly"
import { isly } from "isly"
export interface Authorization {
	type: "authorization"
	id: string
	status: Authorization.Status
	reason?: string
	created: isoly.DateTime
}

export namespace Authorization {
	export const statuses = ["created", "confirmed", "refunded", "captured", "cancelled"] as const
	export type Status = typeof statuses[number]
	export const type = isly.object<Authorization>({
		type: isly.string("authorization"),
		id: isly.string(),
		status: isly.string(statuses),
		reason: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
}
