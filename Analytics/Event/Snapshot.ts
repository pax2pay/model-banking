import { isoly } from "isoly"
import { Realm } from "../../Realm"
import { Treasury } from "../../Treasury"
import { Base } from "./Base"

export type Snapshot = Base<Treasury.Snapshot> & {
	entity: { type: "snapshot"; id: string }
	action: "created"
}
export namespace Snapshot {
	export function create(value: Treasury.Snapshot, realm: Realm, action: Snapshot["action"]): Snapshot {
		return {
			realm,
			entity: { type: "snapshot", id: `${realm}|${isoly.DateTime.now()}` },
			action,
			created: isoly.DateTime.now(),
			value,
		}
	}
}
