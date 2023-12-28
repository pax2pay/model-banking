import { isly } from "isly"
import { Realm } from "../Realm"
import { Rule } from "../Rule"
import { Changeable as OrganizationChangeable } from "./Changeable"
import { Contact as OrganizationContact } from "./Contact"

export interface Organization {
	name: string
	code: string
	realm: Realm
	rules: Rule[]
	contact?: Organization.Contact
}
export namespace Organization {
	export const type = isly.object<Organization>({
		name: isly.string(),
		code: isly.string(new RegExp(/^[A-Za-z0-9\-_]+$/)),
		realm: Realm.type,
		rules: Rule.type.array(),
		contact: OrganizationContact.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export type Changeable = OrganizationChangeable
	export const Changeable = OrganizationChangeable
	export type Contact = OrganizationContact
	export const Contact = OrganizationContact
	export namespace Contact {
		export type Address = OrganizationContact.Address
		export type Addresses = OrganizationContact.Addresses
	}
}
