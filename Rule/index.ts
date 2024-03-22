import { selectively } from "selectively"
import { definitions } from "./definitions"
import { Rule as ModelRule } from "./Rule"
import { State as RuleState } from "./State"

export type Rule = ModelRule

export namespace Rule {
	export const actions = ModelRule.actions
	export type Action = ModelRule.Action
	export const kinds = ModelRule.kinds
	export type Kind = ModelRule.Kind
	export type State = RuleState
	export const State = RuleState
	export namespace State {
		export type Account = RuleState.Account
		export namespace Account {
			export type Transactions = RuleState.Account.Transactions
			export type Days = RuleState.Account.Days
		}
		export type Authorization = RuleState.Authorization
		export type Card = RuleState.Card
		export namespace Card {
			export type Statistics = RuleState.Card.Statistics
		}
		export type Transaction = RuleState.Transaction
		export type Data = RuleState.Data
		export type Partial = RuleState.Partial
		export type Organization = RuleState.Organization
	}

	export const type = ModelRule.type
	export const is = ModelRule.type.is
	export const flaw = ModelRule.type.flaw
	export function score(
		rules: ModelRule.Score[],
		state: State,
		macros?: Record<string, selectively.Definition>
	): State {
		const risk = rules.reduce(
			(r: number | undefined, rule) => (resolve(rule, state, macros) ? (r ?? 100) * (rule.risk / 100) : undefined),
			undefined
		)
		return { ...state, transaction: { ...state.transaction, risk } }
	}
	export function resolve(rule: ModelRule, state: State, macros?: Record<string, selectively.Definition>) {
		return selectively.resolve({ ...macros, ...definitions }, selectively.parse(rule.condition)).is(state)
	}
	export function evaluate(
		rules: Rule[],
		state: State,
		macros?: Record<string, selectively.Definition>
	): Record<Action, Rule[]> {
		const result: Record<Action, Rule[]> = { review: [], reject: [], flag: [] }
		const [other, scorers] = rules.reduce(
			(r: [ModelRule.Other[], ModelRule.Score[]], rule) =>
				rule.action == "score" ? [r[0], r[1].concat(rule)] : [r[0].concat(rule), r[1]],
			[[], []]
		)
		other.forEach(rule => resolve(rule, score(scorers, state, macros), macros) && result[rule.action].push(rule))
		return result
	}
}
