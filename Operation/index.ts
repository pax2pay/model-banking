import * as cryptly from "cryptly"
import * as isoly from "isoly"
import { Creatable as OperationCreatable } from "./Creatable"

export interface Operation extends OperationCreatable {
	id: cryptly.Identifier
	counter: number
	created: isoly.DateTime
}
export namespace Operation {
	export function is(value: any | Operation): value is Operation {
		return (
			typeof value == "object" &&
			cryptly.Identifier.is(value.id, 8) &&
			typeof value.counter == "number" &&
			isoly.DateTime.is(value.created) &&
			OperationCreatable.is({ ...value })
		)
	}
	export function fromCreatable(transaction: cryptly.Identifier, counter: number, operation: Creatable): Operation {
		const timestamp = isoly.DateTime.now()
		return {
			...operation,
			id: transaction,
			counter: counter,
			created: timestamp,
		}
	}

	export type Creatable = OperationCreatable
	export const Creatable = OperationCreatable
}
