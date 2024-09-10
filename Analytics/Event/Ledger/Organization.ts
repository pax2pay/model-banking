import { isoly } from "isoly"
import { Organization as modelOrganization } from "../../../Organization"
import { Realm } from "../../../Realm"
import { Base } from "./Base"

export interface Organization extends Base<modelOrganization> {
	entityType: "organization"
	action: "created" | "updated"
}
export namespace Organization {
	export function create(value: modelOrganization, realm: Realm, action: Organization["action"]): Organization {
		return {
			realm,
			entityType: "organization",
			entity: value.code,
			action,
			created: isoly.DateTime.now(),
			value,
		}
	}
}
