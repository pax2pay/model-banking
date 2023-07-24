import { isly } from "isly"
import { Realm } from "../Realm"
import { Contact } from "./Contact"
import { Rule } from "./Rule"

export interface Creatable {
	name: string
	realm: Realm
	rules: Rule[]
	contact?: Contact
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		name: isly.string(),
		realm: Realm.type,
		rules: isly.fromIs<Rule>("Rule", Rule.is).array(),
		contact: Contact.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
