import { isly } from "isly"
import { Base as RuleBase } from "./Base"
import { Other as RuleOther } from "./Other"
import { Score as RuleScore } from "./Score"

export type Rule = Rule.Other | Rule.Score

export namespace Rule {
	export import Other = RuleOther
	export import Score = RuleScore
	export import Base = RuleBase
	export const actions = [...Other.actions, "score"] as const
	export type Action = typeof actions[number]
}
// Outside of the namespace otherwise the Rule import in Card/Card.Creatable and Organization causes a circular dependency crash
export const type = isly.union<Rule.Other | Rule.Score, Rule.Other, Rule.Score>(Rule.Other.type, Rule.Score.type)
