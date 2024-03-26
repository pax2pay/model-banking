import { isly } from "isly"

export type Rule = Rule.Base & (Rule.Other | Rule.Score)

export namespace Rule {
	export const actions = ["review", "reject", "flag"] as const
	export type Action = typeof actions[number]
	export const kinds = ["authorization", "outbound", "inbound"] as const
	export type Kind = typeof kinds[number]
	export interface Base {
		name: string
		description: string
		type: Rule.Kind
		condition: string
		flags: string[]
		groups?: string[]
	}
	export const Base = isly.object<Base>({
		name: isly.string(),
		description: isly.string(),
		type: isly.string(kinds),
		condition: isly.string(),
		flags: isly.string().array(),
		groups: isly.string().array().optional(),
	})
	export interface Other {
		action: Action
	}
	export const Other = isly.object<Other>({ action: isly.string<Action>(actions) })
	export interface Score {
		action: "score"
		risk: number
	}
	export const Score = isly.object<Score>({ action: isly.string("score"), risk: isly.number(["positive", "integer"]) })
}
// Outside of the namespace otherwise the Rule import in Card/Card.Creatable and Organization causes a circular dependency crash
export const type = isly.intersection<Rule, Rule.Base, Rule.Other | Rule.Score>(
	Rule.Base,
	isly.union<Rule.Other | Rule.Score, Rule.Other, Rule.Score>(Rule.Other, Rule.Score)
)
