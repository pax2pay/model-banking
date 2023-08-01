import { selectively } from "selectively"
import { isly } from "isly"
import { definitions } from "./definitions"
import { State as RuleState } from "./State"

export interface Rule {
	name: string
	description: string
	action: Rule.Action
	type: Rule.Kind
	condition: string
	flags: string[]
}

export namespace Rule {
	export const actions = ["review", "reject", "flag"] as const
	export type Action = typeof actions[number]
	export const kinds = ["authorization", "outbound", "inbound"] as const
	export type Kind = typeof kinds[number]
	export type State = RuleState
	export const type = isly.object<Rule>({
		name: isly.string(),
		description: isly.string(),
		action: isly.string(actions),
		type: isly.string(kinds),
		condition: isly.string(),
		flags: isly.string().array(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function stringify(rule: Rule): string {
		return `{ label: ${rule.name}, action: ${rule.action}, type: ${rule.type}, condition: ${rule.condition}, description: ${rule.description}. }`
	}
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
