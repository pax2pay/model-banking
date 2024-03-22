import { isoly } from "isoly"
import { isly } from "isly"

export type Rule =
	| {
			code: string
			name: string
			description: string
			action: Rule.Action
			type: Rule.Kind
			category: "customer" | "product" | "fincrime"
			condition: string
			flags: string[]
			groups?: string[]
			changed: { by: string; at: isoly.DateTime }
	  }
	| {
			action: "score"
			risk: number
	  }
//type Changed = { changed: { by: string; time: isoly.DateTime; after: Omit<Rule, "changed"> }[] }
// Only fincrime can write rules that generate risk
export namespace Rule {
	type Score = `score ${number}`
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
		groups: isly.string().array().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
