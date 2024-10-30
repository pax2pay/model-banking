import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../Amount"

export interface Authorization {
	type: "authorization"
	id: string
	outcome: Authorization.Outcome
	at: isoly.DateTime
	amount: Amount
	reason?: string
}
export namespace Authorization {
	export const outcomes = ["created", "rejected", "cancelled"] as const
	export type Outcome = typeof outcomes[number]
	export const type = isly.object<Authorization>({
		type: isly.string("authorization"),
		id: isly.string(),
		outcome: isly.string(outcomes),
		at: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		amount: Amount.type,
		reason: isly.string().optional(),
	})
}
