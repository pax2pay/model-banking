import { isly } from "isly"
import { Realm } from "../Realm"
import { Rule } from "../Rule"
import { type as ruleType } from "../Rule/type"
import { Changeable as OrganizationChangeable } from "./Changeable"
import { Contact as OrganizationContact } from "./Contact"

export interface Organization {
	name: string
	code: string
	realm: Realm
	rules: Rule[]
	contact?: Organization.Contact
	groups?: string[]
}
export namespace Organization {
	export const type = isly.object<Organization>({
		name: isly.string(),
		code: isly.string(new RegExp(/^[A-Za-z0-9\-_]+$/)),
		realm: Realm.type,
		rules: ruleType.array(),
		contact: OrganizationContact.type.optional(),
		groups: isly.string().array().optional(),
	})
	export import Changeable = OrganizationChangeable
	export import Contact = OrganizationContact
}
