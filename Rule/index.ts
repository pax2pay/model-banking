import { isly } from "isly"
import { State as RuleState } from "./State"

export type Rule = never
export namespace Rule {
	export import State = RuleState
	export type Kind = (typeof Kind.values)[number]
	export namespace Kind {
		export const values = ["authorization", "outbound", "inbound", "capture", "refund"] as const
		export const type = isly.string<Kind>(values)
	}
	export type Action = (typeof Action.values)[number]
	export namespace Action {
		export const values = ["review", "reject", "flag"] as const
		export const type = isly.string<Action>(values)
	}
	export const type = isly.any<never>()
}
