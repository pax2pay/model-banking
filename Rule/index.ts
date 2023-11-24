import { selectively } from "selectively"
import { definitions } from "./definitions"
import * as ModelRule from "./Rule"
import { State as RuleState } from "./State"

export type Rule = ModelRule.Rule

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
	}

	export const type = ModelRule.type
	export const is = ModelRule.type.is
	export const flaw = ModelRule.type.flaw
	export function evaluate(
		rules: Rule[],
		state: State,
		macros?: Record<string, selectively.Definition>
	): Record<Action, Rule[]> {
		const result: Record<Action, Rule[]> = { review: [], reject: [], flag: [] }
		rules.forEach(
			r =>
				selectively.resolve({ ...macros, ...definitions }, selectively.parse(r.condition)).is(state) &&
				result[r.action].push(r)
		)
		return result
	}
}
