import { isoly } from "isoly"
import { isly } from "isly"
import { isly as isly2 } from "isly2"
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
	export const type2 = isly2.object<Authorization>({
		type: isly2.string("value", "authorization").rename("Operation.Type").describe("Type of operation."),
		id: isly2.string().rename("Id").describe("The id of the operation."),
		status: isly2
			.string("value", ...statuses)
			.rename("Status")
			.describe("The updated status of the operation."),
		reason: isly2.string().optional().rename("Reason").describe("The reason for the status change."),
		created: isly2.from("isoly.DateTime", isoly.DateTime.is).describe("The time of the operation."),
	})
}
