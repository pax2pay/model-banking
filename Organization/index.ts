import * as cryptly from "cryptly"
import { Changeable as OrganizationChangeable } from "./Changeable"
import { Contact as OrganizationContact } from "./Contact"
import { Creatable as OrganizationCreatable } from "./Creatable"

export interface Organization extends OrganizationCreatable {
	readonly id: cryptly.Identifier
}
export namespace Organization {
	export function is(value: Organization | any): value is Organization {
		return value && OrganizationCreatable.is({ ...value }) && typeof value.id == "string"
	}
	export function fromCreatable(organization: Creatable): Organization {
		return { ...organization, id: cryptly.Identifier.generate(8) }
	}
	export function isIdentifier(value: cryptly.Identifier | any): value is cryptly.Identifier {
		return cryptly.Identifier.is(value, 8)
	}
	export type Creatable = OrganizationCreatable
	export const Creatable = OrganizationCreatable
	export type Changeable = OrganizationChangeable
	export const Changeable = OrganizationChangeable
	export type Contact = OrganizationContact
	export const Contact = OrganizationContact
	export namespace Contact {
		export type Address = OrganizationContact.Address
		export type Addresses = OrganizationContact.Addresses
	}
}
