import { isoly } from "isoly"
import { Realm } from "../../Realm"
import { Settlement as modelSettlement } from "../../Settlement"
import { Base } from "./Base"

export type Settlement = Base<modelSettlement> & {
	entity: { type: "settlement"; id: string }
	action: "created" | "settled" | "collected"
}
export namespace Settlement {
	export function create(value: modelSettlement, realm: Realm, action: Settlement["action"]): Settlement {
		return {
			realm,
			entity: { type: "settlement", id: value.id },
			action,
			created: isoly.DateTime.now(),
			value,
		}
	}
}
