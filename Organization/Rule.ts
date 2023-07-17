import { selectively } from "selectively"

const action = ["review", "reject", "flag"] as const
const type = ["authorization", "outbound", "inbound"] as const
export interface Rule {
	name: string
	description: string
	action: typeof action[number]
	type: typeof type[number]
	condition: string
	flags: string[]
}

interface RuleResult {
	rule: Rule
	definition: selectively.Definition
	outcome: boolean
}
namespace RuleResult {
	export function stringify(data: RuleResult): string {
		return `rule: ${Rule.stringify(data.rule)}, \n definition: { definition: ${
			data.definition.definition
		}, arguments: ${data.definition.arguments.toString()} }, \n outcome: ${data.outcome}`
	}
}
export namespace Rule {
	export type Result = RuleResult
	export const Result = RuleResult
	export function is(value: Rule): value is Rule {
		return (
			value &&
			typeof value == "object" &&
			typeof value.name == "string" &&
			action.includes(value.action) &&
			type.includes(value.type) &&
			typeof value.condition == "string" &&
			typeof value.description == "string"
		)
	}
	export function stringify(rule: Rule): string {
		return `{ label: ${rule.name}, action: ${rule.action}, type: ${rule.type}, condition: ${rule.condition}, description: ${rule.description}. }`
	}
}
