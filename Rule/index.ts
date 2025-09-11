import { selectively } from "selectively"
import { isly } from "isly"
import { Exchange } from "../Exchange"
import type { Note } from "../Transaction/Note"
import { Base as RuleBase } from "./Base"
import { control as ruleControl } from "./control"
import { Other as RuleOther } from "./Other"
import { State as RuleState } from "./State"
import { type as ruleType } from "./type"

export type Rule = Rule.Other
export namespace Rule {
	export import Other = RuleOther
	export import State = RuleState
	export import Base = RuleBase
	export import Kind = Base.Kind
	export import Category = Base.Category
	export const control = ruleControl

	export type Action = typeof Action.values[number]
	export namespace Action {
		export const values = [...Other.Action.values] as const
		export const type = isly.string<Action>(values)
	}
	export const type = ruleType
	export function evaluate(
		rules: Rule[],
		state: RuleState,
		macros?: Record<string, selectively.Definition>,
		table: Exchange.Rates = {}
	): RuleState.Evaluated {
		const outcomes: Record<Rule.Action, Rule[]> = {
			review: [],
			reject: [],
			flag: [],
		}
		const notes: Note[] = []
		const evaluated = Other.evaluate(rules, state, macros)
		notes.push(...evaluated.notes)
		outcomes.flag.push(...evaluated.outcomes.flag)
		outcomes.review.push(...evaluated.outcomes.review)
		outcomes.reject.push(...evaluated.outcomes.reject)
		const outcome = outcomes.reject.length > 0 ? "reject" : outcomes.review.length > 0 ? "review" : "approve"
		return { ...state, flags: [...evaluated.flags], notes, outcomes, outcome }
	}
	export function isLegacy(rule: Rule): boolean {
		return !Rule.Base.Category.type.is(rule.category)
	}
	export function fromLegacy(rule: Rule): Rule {
		return isLegacy(rule) ? { ...rule, category: "fincrime" } : rule
	}
}
