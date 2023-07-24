import { selectively } from "selectively"
import { isly } from "isly"
import { definitions } from "./definitions"

const actions = ["review", "reject", "flag"] as const
type Action = typeof actions[number]
const kind = ["authorization", "outbound", "inbound"] as const
export interface Rule {
	name: string
	description: string
	action: Action
	type: typeof kind[number]
	condition: string
	flags: string[]
}

export namespace Rule {
	export const type = isly.object<Rule>({
		name: isly.string(),
		description: isly.string(),
		action: isly.string(actions),
		type: isly.string(kind),
		condition: isly.string(),
		flags: isly.string().array(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function stringify(rule: Rule): string {
		return `{ label: ${rule.name}, action: ${rule.action}, type: ${rule.type}, condition: ${rule.condition}, description: ${rule.description}. }`
	}
	export function evaluate<S extends object>(rules: Rule[], state: S): Record<Action, Rule[]> {
		const result: Record<Action, Rule[]> = { review: [], reject: [], flag: [] }
		rules.forEach(
			r => selectively.resolve(definitions, selectively.parse(r.condition)).is(state) && result[r.action].push(r)
		)
		return result
	}
}
