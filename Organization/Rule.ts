import * as selectively from "selectively"

export interface Rule {
	label: string
	action: "approve" | "review" | "approveReview" | "reject"
	type: "transaction" | "authorization"
	condition: string
	description: string
}

interface RuleResult {
	rule: Rule
	definition: selectively.Definition
	outcome: boolean
}
namespace RuleResult {
	export function stringify(data: RuleResult): string {
		return `rule: ${data.rule}, \n definition: ${data.definition}, \n outcome: ${data.outcome}`
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
			(value.action == "approve" || value.action == "reject" || value.action == "review") &&
			typeof value.type == "string" &&
			(value.type == "transaction" || value.type == "authorization") &&
			typeof value.condition == "string" &&
			typeof value.description == "string"
		)
	}
}
