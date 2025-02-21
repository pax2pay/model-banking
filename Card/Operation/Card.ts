import { isoly } from "isoly"
import { isly } from "isly"
import { isly as isly2 } from "isly2"
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
	export const type2 = isly2
		.object<Card>({
			type: isly2.string("value", "card").rename("Type").describe("Type of operation."),
			status: isly2
				.string("value", ...statuses)
				.rename("Status")
				.describe("The updated status of the card."),
			from: Changeable.type2.optional(),
			created: isly2.from("isoly.DateTime", isoly.DateTime.is).describe("The time of the operation."),
		})
		.rename("Operation.Card")
		.describe("A card operation.")
}
