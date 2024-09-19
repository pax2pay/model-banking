import { isly } from "isly"
import { Realm } from "../../Realm"
import { Base as RuleBase } from "./Base"
import { Charge as RuleCharge } from "./Charge"
import { Other as RuleOther } from "./Other"
import { Score as RuleScore } from "./Score"

export type Rule = Rule.Other | Rule.Score | Rule.Charge

export namespace Rule {
	export import Other = RuleOther
	export import Score = RuleScore
	export import Charge = RuleCharge
	export import Base = RuleBase
	export type Api = Rule.Other | Rule.Score | Rule.Charge.Api
	export namespace Api {
		export const type = isly.union<Api, Rule.Other, Rule.Score, Rule.Charge.Api>(
			Rule.Other.type,
			Rule.Score.type,
			Rule.Charge.Api.type
		)
		export function from(rule: Rule.Api, realm: Realm): Rule {
			return rule.action == "charge" ? Charge.Api.from(rule, realm) : rule
		}
	}
	export type Action = typeof Action.values[number]
	export namespace Action {
		export const values = [...Other.Action.values, Score.Action.value, Charge.Action.value] as const
		export const type = isly.string<Action>(values)
	}
}
// Outside of the namespace otherwise the Rule import in Card/Card.Creatable and Organization causes a circular dependency crash
export const type = isly.union<Rule.Other | Rule.Score | Rule.Charge, Rule.Other, Rule.Score, Rule.Charge.Api>(
	Rule.Other.type,
	Rule.Score.type,
	Rule.Charge.Api.type
)
