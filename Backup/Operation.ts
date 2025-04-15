import { isoly } from "isoly"
import { Operation as modelOperation } from "../Operation"
import { Base } from "./Base"

export interface Operation extends Base<modelOperation> {
	entityType: "operation"
	entity: string
	account: string
}
export namespace Operation {
	export const create: Base.Create<modelOperation, Operation, { organization: string }> = (
		value: modelOperation,
		action: Base.Action,
		data?: { organization: string }
	) => ({
		entityType: "operation",
		entity: value.signature ?? "",
		...data,
		account: value.account,
		action,
		created: isoly.DateTime.now(),
		value,
	})
	export const addSender = Base.pipeToSender(create)
}
