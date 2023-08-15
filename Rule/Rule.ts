import { isly } from "isly"

export interface Rule {
	name: string
	description: string
	action: Action
	type: Kind
	condition: string
	flags: string[]
}

export const actions = ["review", "reject", "flag"] as const
export type Action = typeof actions[number]
export const kinds = ["authorization", "outbound", "inbound"] as const
export type Kind = typeof kinds[number]

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
