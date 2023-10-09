import { isly } from "isly"
import { Realm } from "../Realm"
import { Rule } from "../Rule"
import { Contact } from "./Contact"

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
		rules: Rule.type.array(),
		contact: Contact.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
