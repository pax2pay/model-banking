import { isly } from "isly"
import { Evaluation as RuleEvaluation } from "./Evaluation"
import { Score as RuleScore } from "./Score"

export type Rule = Rule.Score | Rule.Evaluation

// type Changed = { changed: { by: string; time: isoly.DateTime; after: Omit<Rule, "changed"> }[] }
// Only fincrime can write rules that generate risk
export namespace Rule {
	export import Score = RuleScore
	export import Evaluation = RuleEvaluation
	export const actions = ["review", "reject", "flag"] as const
	export type Action = typeof actions[number]
	export const kinds = ["authorization", "outbound", "inbound"] as const
	export type Kind = typeof kinds[number]

	export const type = isly.object<Evaluation>({
		name: isly.string(),
		description: isly.string(),
		action: isly.string(actions),
		type: isly.string(kinds),
		condition: isly.string(),
		flags: isly.string().array(),
		groups: isly.string().array().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
