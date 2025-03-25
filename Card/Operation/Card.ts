import { isoly } from "isoly"
import { isoly as isoly } from "isoly"
import { isly } from "isly"
import { isly as isly } from "isly"
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
		created: isoly.DateTime.type,
	})
	export const type: isly.Object<Card> = isly
		.object<Card>({
			type: isly.string("value", "card").rename("Type").describe("Type of operation."),
			status: isly
				.string("value", ...statuses)
				.rename("Status")
				.describe("The updated status of the card."),
			from: Changeable.type.optional(),
			created: isoly.DateTime.type.rename("Created").describe("The time of the operation."),
		})
		.describe("A card operation.")
		.rename("Operation.Card")
}
