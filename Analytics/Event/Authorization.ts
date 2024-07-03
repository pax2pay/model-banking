import { isoly } from "isoly"
import { Authorization as modelAuthorization } from "../../Authorization"
import { Realm } from "../../Realm"
import { Base } from "./Base"

export type Authorization = Base<modelAuthorization> & {
	entity: { type: "authorization"; id: string }
	action: "created" | "finalized" | "cancelled"
}
export namespace Authorization {
	export function create(value: modelAuthorization, realm: Realm, action: Authorization["action"]): Authorization {
		return {
			realm,
			entity: { type: "authorization", id: value.id },
			action,
			created: isoly.DateTime.now(),
			value,
		}
	}
}
