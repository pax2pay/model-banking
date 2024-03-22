import { Rule } from "./Rule"

export interface Evaluation {
	name: string
	description: string
	action: Rule.Action
	type: Rule.Kind
	condition: string
	flags: string[]
	groups?: string[]
}

export namespace Evaluation {}
