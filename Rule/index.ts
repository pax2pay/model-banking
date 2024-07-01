import { selectively } from "selectively"
import { isly } from "isly"
import { definitions } from "./definitions"
import { Rule as ModelRule, type as ruleType } from "./Rule"
import { State as RuleState } from "./State"

export type Rule = ModelRule

export namespace Rule {
	export import Action = ModelRule.Action
	export import Category = ModelRule.Base.Category
	export import Kind = ModelRule.Base.Kind
	export import Other = ModelRule.Other
	export import Score = ModelRule.Score
	export import State = RuleState
	export const type = ruleType
	export const is = ruleType.is
	export const flaw = ruleType.flaw
	function control(rule: ModelRule, state: State, macros?: Record<string, selectively.Definition>) {
		return selectively.resolve({ ...macros, ...definitions }, selectively.parse(rule.condition)).is(state)
	}
	function score(
		rules: ModelRule.Score[],
		state: State,
		macros?: Record<string, selectively.Definition>
	): number | undefined {
		return rules.reduce(
			(r: number | undefined, rule) => (control(rule, state, macros) ? (r ?? 100) * (rule.risk / 100) : undefined),
			undefined
		)
	}
	export function evaluate(
		rules: Rule[],
		state: State,
		macros?: Record<string, selectively.Definition>
	): Record<ModelRule.Other.Action, Rule[]> & { risk?: number } {
		const result: Record<ModelRule.Other.Action, Rule[]> & { risk?: number } = { review: [], reject: [], flag: [] }
		const [other, scorers] = rules.reduce(
			(r: [ModelRule.Other[], ModelRule.Score[]], rule) => {
				if (
					!rule.groups ||
					rule.groups.some(ruleGroup =>
						state.organization?.groups?.some(organizationGroup => organizationGroup == ruleGroup)
					)
				) {
					rule.action == "score" ? r[1].push(rule) : r[0].push(rule)
				}
				return r
			},
			[[], []]
		)
		state.transaction.risk = score(scorers, state, macros)
		result.risk = state.transaction.risk
		other.forEach(rule => control(rule, state, macros) && result[rule.action].push(rule))
		return result
	}
	export function isLegacy(rule: Rule): boolean {
		return !isly.string(ModelRule.Base.Category.values).is(rule.category)
	}
	export function fromLegacy(rule: Rule): Rule {
		return isLegacy(rule) ? { ...rule, category: "fincrime" } : rule
	}
}
