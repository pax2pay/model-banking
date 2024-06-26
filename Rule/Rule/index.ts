import { isly } from "isly"
import { Base as RuleBase } from "./Base"
import { Other as RuleOther } from "./Other"
import { Score as RuleScore } from "./Score"

export type Rule = Rule.Other | Rule.Score

export namespace Rule {
	export import Other = RuleOther
	export import Score = RuleScore
	export import Base = RuleBase
	export type Action = typeof Action.values[number]
	export namespace Action {
		export const values = [...Other.Action.values, "score"] as const
		export const type = isly.string<Action>(values)
	}
}
// Outside of the namespace otherwise the Rule import in Card/Card.Creatable and Organization causes a circular dependency crash
export const type = isly.union<Rule.Other | Rule.Score, Rule.Other, Rule.Score>(Rule.Other.type, Rule.Score.type)
