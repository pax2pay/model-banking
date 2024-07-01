import { isoly } from "isoly"
import { selectively } from "selectively"
import { Note } from "../Transaction/Note"
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
	function shouldUse(kind: Rule.Kind, rule: Rule, groups: string[] | undefined): boolean {
		return (
			kind == rule.type &&
			(!rule.groups || rule.groups.some(ruleGroup => groups?.some(organizationGroup => organizationGroup == ruleGroup)))
		)
	}
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
	): State.Evaluated {
		const outcomes: Record<ModelRule.Other.Action, Rule[]> = { review: [], reject: [], flag: [] }
		const [other, scorers] = rules.reduce(
			(r: [ModelRule.Other[], ModelRule.Score[]], rule) => {
				if (shouldUse(state.transaction.kind, rule, state.organization?.groups))
					rule.action == "score" ? r[1].push(rule) : r[0].push(rule)
				return r
			},
			[[], []]
		)
		state.transaction.risk = score(scorers, state, macros)
		const notes: Note[] = []
		const flags: Set<string> = new Set()
		const now = isoly.DateTime.now()
		for (const rule of other) {
			if (control(rule, state, macros)) {
				outcomes[rule.action].push(rule)
				notes.push({ author: "automatic", created: now, text: rule.name, rule })
				rule.flags.forEach(f => flags.add(f))
			}
		}
		const outcome = outcomes.reject.length > 0 ? "reject" : outcomes.review.length > 0 ? "review" : "approve"
		return { ...state, flags: [...flags], notes, outcomes, outcome }
	}
	export function isLegacy(rule: Rule): boolean {
		return !ModelRule.Base.Category.type.is(rule.category)
	}
	export function fromLegacy(rule: Rule): Rule {
		return isLegacy(rule) ? { ...rule, category: "fincrime" } : rule
	}
}
