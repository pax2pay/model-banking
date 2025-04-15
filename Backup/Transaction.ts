import { isoly } from "isoly"
import { Transaction as modelTransaction } from "../Transaction"
import { Base } from "./Base"

export interface Transaction extends Base<modelTransaction & { state?: any }> {
	entityType: "transaction"
	entity: string
	organization: string
	account: string
	isError?: true
}
export namespace Transaction {
	export const create: Base.Create<modelTransaction & { state?: any }, Transaction, { isError?: true; meta?: any }> = (
		value: modelTransaction & { state?: any },
		action: Base.Action,
		data?: { isError?: true; meta?: any }
	) => ({
		entityType: "transaction",
		entity: value.id,
		organization: value.organization,
		account: value.accountId,
		action,
		...data,
		created: isoly.DateTime.now(),
		value,
	})
	export const addSender = Base.pipeToSender(create)
}
