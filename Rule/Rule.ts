import { isly } from "isly"

export interface Rule {
	name: string
	description: string
	action: Rule.Action
	type: Rule.Kind
	category: Rule.Category
	condition: string
	flags: string[]
	groups?: string[]
}

export namespace Rule {
	export const categories = ["customer", "product", "fincrime"] as const
	export type Category = typeof categories[number]
	export const actions = ["review", "reject", "flag"] as const
	export type Action = typeof actions[number]
	export const kinds = ["authorization", "outbound", "inbound"] as const
	export type Kind = typeof kinds[number]

	export const type = isly.object<Rule>({
		name: isly.string(),
		description: isly.string(),
		action: isly.string(actions),
		type: isly.string(kinds),
		category: isly.string(categories),
		condition: isly.string(),
		flags: isly.string().array(),
		groups: isly.string().array().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
