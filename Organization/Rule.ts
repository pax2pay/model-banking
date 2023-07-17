import { selectively } from "selectively"

export interface Rule {
	label: string
	action: "review" | "reject" | "flag"
	type: "transaction" | "authorization"
	condition: string
	flag: string[]
	description: string
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
			typeof value.label == "string" &&
			typeof value.action == "string" &&
			(value.action == "approve" ||
				value.action == "reject" ||
				value.action == "review" ||
				value.action == "approveReview") &&
			typeof value.type == "string" &&
			(value.type == "transaction" || value.type == "authorization") &&
			typeof value.condition == "string" &&
			typeof value.description == "string"
		)
	}
	export function stringify(rule: Rule): string {
		return `{ label: ${rule.label}, action: ${rule.action}, type: ${rule.type}, condition: ${rule.condition}, description: ${rule.description}. }`
	}
}
