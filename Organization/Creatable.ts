import { Rule } from "./Rule"

export interface Creatable {
	name: string
	realm: "test" | "uk" | "eu"
	rules: Rule[]
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			value &&
			typeof value == "object" &&
			typeof value.name == "string" &&
			(value.realm == "test" || value.realm == "uk" || value.realm == "eu") &&
			value.rules &&
			typeof value.rules == "object" &&
			Array.isArray(value.rules) &&
			value.rules.every(Rule.is)
		)
	}
}
