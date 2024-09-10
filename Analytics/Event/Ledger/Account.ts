import { isoly } from "isoly"
import { Account as modelAccount } from "../../../Account"
import { Realm } from "../../../Realm"
import { Base } from "./Base"

export interface Account extends Base<modelAccount> {
	entityType: "account"
	action: "created" | "updated"
	meta: { accountKey: string }
}
export namespace Account {
	export function create(value: modelAccount, organization: string, realm: Realm, action: Account["action"]): Account {
		return {
			realm,
			entity: value.id,
			entityType: "account",
			organization,
			action,
			created: isoly.DateTime.now(),
			meta: { accountKey: value.key ?? "" },
			value,
		}
	}
}
