import { isoly } from "isoly"
import { Account as modelAccount } from "../../Account"
import { Realm } from "../../Realm"
import { Base } from "./Base"

export type Account = Base<modelAccount> & {
	entity: { type: "account"; id: string }
	action: "created" | "updated"
}
export namespace Account {
	export function create(value: modelAccount, realm: Realm, action: Account["action"]): Account {
		return {
			realm,
			entity: { type: "account", id: value.id },
			action,
			created: isoly.DateTime.now(),
			value,
		}
	}
}
