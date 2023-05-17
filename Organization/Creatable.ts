import { Realm } from "../Realm"
import { Rule } from "./Rule"

export interface Creatable {
	name: string
	address: string
	realm: Realm
	rules: Rule[]
}

export namespace Creatable {
	export function is(value: any | Creatable): value is Creatable {
		return (
			value &&
			typeof value == "object" &&
			typeof value.name == "string" &&
			typeof value.address == "string" &&
			Realm.is(value.realm) &&
			value.rules &&
			typeof value.rules == "object" &&
			Array.isArray(value.rules) &&
			value.rules.every(Rule.is)
		)
	}
}
