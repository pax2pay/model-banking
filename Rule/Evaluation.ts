import { Rule } from "./Rule"

export interface Other {
	name: string
	description: string
	action: Rule.Action
	type: Rule.Kind
	condition: string
	flags: string[]
	groups?: string[]
}

export namespace Other {}
