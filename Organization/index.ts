import { isly } from "isly"
import { Realm } from "../Realm"
import { Rule } from "../Rule"
import { type as ruleType } from "../Rule/type"
import { Changeable as OrganizationChangeable } from "./Changeable"
import { Contact as OrganizationContact } from "./Contact"
import { Creatable as OrganizationCreatable } from "./Creatable"
import { Fx as OrganizationFx } from "./Fx"
import { Risk as OrganizationRisk } from "./Risk"

export interface Organization {
	name: string
	code: string
	realm: Realm
	rules: Rule[]
	status: "active" | "inactive"
	risk?: Organization.Risk
	contact?: Organization.Contact
	groups?: string[]
	fx?: OrganizationFx
}
export namespace Organization {
	export import Creatable = OrganizationCreatable
	export import Changeable = OrganizationChangeable
	export import Risk = OrganizationRisk
	export import Contact = OrganizationContact
	export import Fx = OrganizationFx
	export const type = isly.object<Organization>({
		name: isly.string(),
		code: isly.string(new RegExp(/^[A-Za-z0-9\-_]+$/)),
		realm: Realm.type,
		rules: ruleType.array(),
		status: isly.string(["active", "inactive"]),
		risk: Organization.Risk.type.optional(),
		contact: Contact.type.optional(),
		groups: isly.string().array().optional(),
		fx: OrganizationFx.type.optional(),
	})
}
