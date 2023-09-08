import * as cryptly from "cryptly"
import { isoly } from "isoly"
import { Rail } from "../Rail"
import { Creatable as OperationCreatable } from "./Creatable"

export interface Operation extends OperationCreatable {
	id: cryptly.Identifier
	rail: Rail
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
	export function fromCreatable(transaction: cryptly.Identifier, rail: Rail, creatable: Creatable): Operation {
		const timestamp = isoly.DateTime.now()
		return {
			...creatable,
			id: transaction,
			rail,
			counter: 0,
			created: timestamp,
		}
	}

	export type Creatable = OperationCreatable
	export const Creatable = OperationCreatable
}
