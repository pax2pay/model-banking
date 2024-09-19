import { isoly } from "isoly"
import { selectively } from "selectively"
import { Exchange } from "../Exchange"
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
	export import Charge = ModelRule.Charge
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
	function control(rule: ModelRule, state: State, macros?: Record<string, selectively.Definition>): boolean {
		return selectively.resolve({ ...macros, ...definitions }, selectively.parse(rule.condition)).is(state)
	}
	function score(
		rules: ModelRule.Score[],
		state: State,
		macros?: Record<string, selectively.Definition>
	): number | undefined {
		return rules.reduce(
			(r: number | undefined, rule) => (control(rule, state, macros) ? (r ?? 100) * (rule.risk / 100) : r),
			undefined
		)
	}
	function charge(
		rules: ModelRule.Charge[],
		state: State,
		macros?: Record<string, selectively.Definition>,
		table: Exchange.Rates = {}
	): { outcomes: Rule[]; charge: number } {
		const result: { outcomes: Rule[]; charge: number } = { outcomes: [], charge: 0 }
		for (const rule of rules) {
			if (control(rule, state, macros)) {
				if (rule.charge.percentage)
					result.charge = isoly.Currency.add(
						state.transaction.currency,
						result.charge,
						isoly.Currency.multiply(state.transaction.currency, state.transaction.amount, rule.charge.percentage / 100)
					)
				if (rule.charge.fixed) {
					const charge =
						state.transaction.currency === rule.charge.fixed[0]
							? rule.charge.fixed[1]
							: Exchange.convert(rule.charge.fixed[1], rule.charge.fixed[0], state.transaction.currency, table) ?? 0
					result.charge = isoly.Currency.add(state.transaction.currency, result.charge, charge)
				}
			}
			result.outcomes.push(rule)
		}
		return result
	}
	export function evaluate(
		rules: Rule[],
		state: State,
		macros?: Record<string, selectively.Definition>,
		table: Exchange.Rates = {}
	): State.Evaluated {
		const outcomes: Record<ModelRule.Other.Action | ModelRule.Charge.Action, Rule[]> = {
			review: [],
			reject: [],
			flag: [],
			charge: [],
		}
		const { other, chargers, scorers } = rules.reduce(
			(r: { other: ModelRule.Other[]; chargers: ModelRule.Charge[]; scorers: ModelRule.Score[] }, rule) => {
				if (shouldUse(state.transaction.kind, rule, state.organization?.groups))
					rule.action == "score"
						? r.scorers.push(rule)
						: rule.action == "charge"
						? r.chargers.push(rule)
						: r.other.push(rule)
				return r
			},
			{ other: [], chargers: [], scorers: [] }
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
				rule.action == "review" && flags.add("review")
			}
		}
		const charged = charge(chargers, state, macros, table)
		state.transaction.original.charge = isoly.Currency.add(
			state.transaction.original.currency,
			state.transaction.original.charge ?? 0,
			charged.charge
		)
		state.transaction.original.total =
			state.transaction.kind == "authorization" ||
			state.transaction.kind == "outbound" ||
			state.transaction.kind == "capture"
				? isoly.Currency.add(state.transaction.original.currency, state.transaction.original.amount, charged.charge)
				: isoly.Currency.subtract(
						state.transaction.original.currency,
						state.transaction.original.amount,
						charged.charge
				  )
		outcomes.charge.push(...charged.outcomes)
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
