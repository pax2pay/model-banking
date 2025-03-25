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
		type: isly.string("value", "authorization").rename("Operation.Type").describe("Type of operation."),
		id: isly.string().rename("Id").describe("The id of the operation."),
		status: isly
			.string("value", ...statuses)
			.rename("Status")
			.describe("The updated status of the operation."),
		reason: isly.string().optional().rename("Reason").describe("The reason for the status change."),
		created: isoly.DateTime.type.describe("The time of the operation."),
	})
}
