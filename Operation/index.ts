import * as cryptly from "cryptly"
import * as isoly from "isoly"
import { Creatable as OperationCreatable } from "./Creatable"

export interface Operation extends OperationCreatable {
	id: cryptly.Identifier
	transactionId: cryptly.Identifier
	created: isoly.DateTime
}
export namespace Operation {
	export function is(value: any | Operation): value is Operation {
		return (
			typeof value == "object" &&
			cryptly.Identifier.is(value.id, 8) &&
			cryptly.Identifier.is(value.transactionId, 8) &&
			isoly.DateTime.is(value.created) &&
			OperationCreatable.is({ ...value })
		)
	}
	export function fromCreatable(transaction: cryptly.Identifier, operation: Creatable): Operation {
		const id = cryptly.Identifier.generate(8)
		const timestamp = isoly.DateTime.now()
		return {
			...operation,
			id: id,
			transactionId: transaction,
			created: timestamp,
		}
	}

	export type Creatable = OperationCreatable
	export const Creatable = OperationCreatable
}
