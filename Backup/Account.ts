import { isoly } from "isoly"
import { Account as modelAccount } from "../Account"
import { Base } from "./Base"

export interface Account extends Base<modelAccount> {
	entityType: "account"
	entity: string
	organization: string
	account: string
	meta: { key: string }
}
export namespace Account {
	export const create: Base.Create<modelAccount, Account> = (value: modelAccount, action: Base.Action) => ({
		entityType: "account",
		entity: value.id,
		organization: value.organization,
		account: value.id,
		action,
		created: isoly.DateTime.now(),
		meta: { key: value.key ?? "" },
		value,
	})
	export const addSender = Base.pipeToSender(create)
}
