import { isoly } from "isoly"
import { Operation as modelOperation } from "../../Operation"
import { Realm } from "../../Realm"
import { Base } from "./Base"

export type Operation = Base<modelOperation> & {
	entity: { type: "operation"; id: string }
	action: "created"
}
export namespace Operation {
	export function create(value: modelOperation, realm: Realm, action: Operation["action"]): Operation {
		return {
			realm,
			entity: { type: "operation", id: value.signature ?? "" },
			action,
			created: isoly.DateTime.now(),
			value,
		}
	}
}
