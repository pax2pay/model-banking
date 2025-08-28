import { isly } from "isly"
import { Realm } from "../Realm"
import { Rule } from "../Rule"
import { type as ruleType } from "../Rule/type"
import { Contact } from "./Contact"

export interface Creatable {
	name: string
	code: string
	realm: Realm
	rules: Rule[]
	contact?: Contact.Creatable
	groups?: string[]
}
export namespace Creatable {
	export const type = isly.object<Creatable>({
		name: isly.string(),
		code: isly.string(new RegExp(/^[A-Za-z0-9\-_]+$/)),
		realm: Realm.type,
		rules: ruleType.array(),
		contact: Contact.Creatable.type.optional(),
		groups: isly.string().array().optional(),
	})
}
