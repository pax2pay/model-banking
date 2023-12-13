import { isoly } from "isoly"
import { isly } from "isly"
import { Changeable } from "../Changeable"

export interface Card {
	type: "card"
	status: Card.Status
	from?: Changeable
	created: isoly.DateTime
}

export namespace Card {
	export const statuses = ["created", "changed", "cancelled"] as const
	export type Status = typeof statuses[number]
	export const type = isly.object<Card>({
		type: isly.string("card"),
		status: isly.string(statuses),
		from: Changeable.type.optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
}
