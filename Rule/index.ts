import { isly } from "isly"
import { State as RuleState } from "./State"

export type Rule = never
export namespace Rule {
	export import State = RuleState
	export const type = isly.any()
}
