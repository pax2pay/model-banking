import { isoly } from "isoly"
import { Operation as modelOperation } from "../../../Operation"
import { Realm } from "../../../Realm"
import { Base } from "./Base"

export interface Operation extends Base<modelOperation> {
	entity: { type: "operation"; id: string }
	action: "created"
}
export namespace Operation {
	export function create(
		value: modelOperation,
		realm: Realm,
		action: Operation["action"],
		organization?: string,
		account?: string
	): Operation {
		return {
			realm,
			entity: { type: "operation", id: value.signature ?? "" },
			organization,
			account,
			action,
			created: isoly.DateTime.now(),
			value,
		}
	}
}
