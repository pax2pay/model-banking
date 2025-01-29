import { isoly } from "isoly"
import { Account as modelAccount } from "../../../Account"
import { Realm } from "../../../Realm"
import { Base } from "./Base"

export interface Account extends Base<modelAccount> {
	entity: { type: "account"; id: string }
	action: Account.Action
	meta: { accountKey: string }
}
export namespace Account {
	export type Action = typeof Action.values[number]
	export namespace Action {
		export const values = ["created", "updated"] as const
	}
	export function create(value: modelAccount, organization: string, realm: Realm, action: Account["action"]): Account {
		return {
			realm,
			entity: { type: "account", id: value.id },
			organization,
			action,
			created: isoly.DateTime.now(),
			meta: { accountKey: value.key ?? "" },
			value,
		}
	}
}
