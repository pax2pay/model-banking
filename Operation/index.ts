import * as cryptly from "cryptly"
import * as isoly from "isoly"
import { Creatable as OperationCreatable } from "./Creatable"

export interface Operation extends OperationCreatable {
	id: cryptly.Identifier
	created: isoly.DateTime
}
export namespace Operation {
	export function is(value: any | Operation): value is Operation {
		return (
			typeof value == "object" &&
			cryptly.Identifier.is(value.id, 8) &&
			isoly.DateTime.is(value.created) &&
			OperationCreatable.is({ ...value })
		)
	}
	export function fromCreatable(operation: Creatable): Operation {
		const id = cryptly.Identifier.generate(8)
		const timestamp = isoly.DateTime.now()
		return {
			...operation,
			id: id,
			created: timestamp,
		}
	}

	export type Creatable = OperationCreatable
	export const Creatable = OperationCreatable
}
