import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../Amount"

export interface Authorization {
	type: "authorization"
	id: string
	event: Authorization.Event
	created: isoly.DateTime
	amount: Amount
	reason?: string
}
export namespace Authorization {
	export const events = ["created", "rejected", "refunded", "captured", "cancelled"] as const
	export type Event = typeof events[number]
	export const type = isly.object<Authorization>({
		type: isly.string("authorization"),
		id: isly.string(),
		event: isly.string(events),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		amount: Amount.type,
		reason: isly.string().optional(),
	})
	export const is = type.is
}
