import { isoly } from "isoly"
import { Organization as modelOrganization } from "../Organization"
import { Realm } from "../Realm"
import { Base } from "./Base"

export interface Organization extends Base<modelOrganization> {
	realm: Realm
	entityType: "organization"
	entity: string
	organization: string
}
export namespace Organization {
	export const create: Base.Create<modelOrganization, Organization> = (
		value: modelOrganization,
		action: Base.Action
	) => ({
		realm: value.realm,
		entityType: "organization",
		entity: value.code,
		organization: value.code,
		action,
		created: isoly.DateTime.now(),
		value,
	})
	export const addSender = Base.pipeToSender(create)
}
