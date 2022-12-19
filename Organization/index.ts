import * as cryptly from "cryptly"
import { Creatable as OrganizationCreatable } from "./Creatable"

export interface Organization extends OrganizationCreatable {
	readonly id: cryptly.Identifier
}

export namespace Organization {
	export function is(value: Organization | any): value is Organization {
		return !!(
			value &&
			typeof value == "object" &&
			cryptly.Identifier.is(value.id, 8) &&
			typeof value.name == "string" &&
			typeof value.value == "number"
		)
	}
	export function fromCreatable(organization: Creatable): Organization {
		return { ...organization, id: cryptly.Identifier.generate(8) }
	}
	export type Creatable = OrganizationCreatable
	export const Creatable = OrganizationCreatable
}
