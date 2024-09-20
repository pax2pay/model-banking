import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../Amount"

export interface Clearing {
	type: "clearing"
	event: Clearing.Event
	created: isoly.DateTime
	amount: Amount
	charge: Amount
}
export namespace Clearing {
	export const events = ["captured", "refunded"] as const
	export type Event = typeof events[number]
	export const type = isly.object<Clearing>({
		type: isly.string("clearing"),
		event: isly.string<Event>(events),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		amount: Amount.type,
		charge: Amount.type,
	})
}
