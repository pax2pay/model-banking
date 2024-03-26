import { isly } from "isly"
import { Other as RuleOther } from "./Other"
import { Score as RuleScore } from "./Score"

export type Rule = Rule.Base & (Rule.Other | Rule.Score)

export namespace Rule {
	export import Other = RuleOther
	export import Score = RuleScore
	export const actions = [...Other.actions, "score"] as const
	export type Action = typeof actions[number]
	export const kinds = ["authorization", "outbound", "inbound"] as const
	export type Kind = typeof kinds[number]
	export interface Base {
		name: string
		description: string
		type: Rule.Kind
		condition: string
		flags: string[]
		groups?: string[]
	}
	export const Base = isly.object<Base>({
		name: isly.string(),
		description: isly.string(),
		type: isly.string(kinds),
		condition: isly.string(),
		flags: isly.string().array(),
		groups: isly.string().array().optional(),
	})
}
// Outside of the namespace otherwise the Rule import in Card/Card.Creatable and Organization causes a circular dependency crash
export const type = isly.intersection<Rule, Rule.Base, Rule.Other | Rule.Score>(
	Rule.Base,
	isly.union<Rule.Other | Rule.Score, Rule.Other, Rule.Score>(Rule.Other.type, Rule.Score.type)
)
