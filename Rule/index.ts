import { selectively } from "selectively"
import { isly } from "isly"
import { Exchange } from "../Exchange"
import { Realm } from "../Realm"
import { Base as RuleBase } from "./Base"
import { Charge as RuleCharge } from "./Charge"
import { control as ruleControl } from "./control"
import { Other as RuleOther } from "./Other"
import { Reserve as RuleReserve } from "./Reserve"
import { Score as RuleScore } from "./Score"
import { State as RuleState } from "./State"
import { type as ruleType } from "./type"

export type Rule = Rule.Other | Rule.Score | Rule.Charge | Rule.Reserve
export namespace Rule {
	export import Other = RuleOther
	export import Score = RuleScore
	export import Charge = RuleCharge
	export import State = RuleState
	export import Reserve = RuleReserve
	export import Base = RuleBase
	export import Kind = Base.Kind
	export import Category = Base.Category
	export const control = ruleControl
	export type Api = Rule.Other | Rule.Score | Rule.Charge.Api | Rule.Reserve.Api
	export namespace Api {
		export const type = isly.union<Api, Rule.Other, Rule.Score, Rule.Charge.Api, Rule.Reserve.Api>(
			Rule.Other.type,
			Rule.Score.type,
			Rule.Charge.Api.type,
			Rule.Reserve.Api.type
		)
	}
	export function fromApi(rule: Rule.Api, realm: Realm): Rule {
		return rule.action == "charge"
			? Charge.fromApi(rule, realm)
			: rule.action == "reserve"
			? Reserve.fromApi(rule, realm)
			: rule
	}
	export type Action = typeof Action.values[number]
	export namespace Action {
		export const values = [
			...Other.Action.values,
			Score.Action.value,
			Charge.Action.value,
			Reserve.Action.value,
		] as const
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
			charge: [],
			score: [],
			reserve: [],
		}
		const { other, chargers, scorers, reservers } = sort(rules, state)
		const scored = Score.evaluate(scorers, state, macros)
		outcomes.score.push(...scored.outcomes)
		state.transaction.risk = scored.risk
		const evaluated = Other.evaluate(other, state, macros)
		outcomes.flag.push(...evaluated.outcomes.flag)
		outcomes.review.push(...evaluated.outcomes.review)
		outcomes.reject.push(...evaluated.outcomes.reject)
		const reserved = Reserve.evaluate(reservers, state, macros, table)
		outcomes.reserve.push(...reserved.outcomes)
		state.transaction.original.reserve = reserved.reserve
		state.transaction.original.total = Reserve.apply(reserved.reserve, state)
		const charged = Charge.evaluate(chargers, state, macros, table)
		outcomes.charge.push(...charged.outcomes)
		state.transaction.original.charge = charged.charge
		state.transaction.original.total = Charge.apply(charged.charge, state)
		const outcome = outcomes.reject.length > 0 ? "reject" : outcomes.review.length > 0 ? "review" : "approve"
		return { ...state, flags: [...evaluated.flags], notes: evaluated.notes, outcomes, outcome }
	}
	function sort(
		rules: Rule[],
		state: State
	): { other: Rule.Other[]; chargers: Rule.Charge[]; scorers: Rule.Score[]; reservers: Rule.Reserve[] } {
		return rules.reduce(
			(r: ReturnType<typeof sort>, rule) => {
				if (Base.Kind.is(state.transaction.kind, rule, state.organization?.groups))
					rule.action == "score"
						? r.scorers.push(rule)
						: rule.action == "charge"
						? r.chargers.push(rule)
						: rule.action == "reserve"
						? r.reservers.push(rule)
						: r.other.push(rule)
				return r
			},
			{ other: [], chargers: [], scorers: [], reservers: [] }
		)
	}
	export function isLegacy(rule: Rule): boolean {
		return !Rule.Base.Category.type.is(rule.category)
	}
	export function fromLegacy(rule: Rule): Rule {
		return isLegacy(rule) ? { ...rule, category: "fincrime" } : rule
	}
}
