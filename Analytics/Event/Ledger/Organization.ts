import { isoly } from "isoly"
import { Organization as modelOrganization } from "../../../Organization"
import { Realm } from "../../../Realm"
import { Base } from "./Base"

export interface Organization extends Base<modelOrganization> {
	entity: { type: "organization"; id: string }
	action: "created" | "updated"
}
export namespace Organization {
	export function create(value: modelOrganization, realm: Realm, action: Organization["action"]): Organization {
		return {
			realm,
			entity: { type: "organization", id: value.code },
			action,
			created: isoly.DateTime.now(),
			value,
		}
	}
}
