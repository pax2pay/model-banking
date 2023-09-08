import * as cryptly from "cryptly"
import { isoly } from "isoly"
import { Rail } from "../Rail"
import type { Transaction } from "../Transaction"
import { Creatable as OperationCreatable } from "./Creatable"

export interface Operation extends OperationCreatable {
	transaction: { id: cryptly.Identifier; rail: Rail }
	counter: number
	created: isoly.DateTime
	// signature: string TODO: add chained signatures.
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
	export function fromCreatable(transaction: Transaction, creatable: Creatable): Operation {
		const timestamp = isoly.DateTime.now()
		return {
			...creatable,
			transaction: { id: transaction.id, rail: transaction.rail },
			counter: 0,
			created: timestamp,
		}
	}

	export type Creatable = OperationCreatable
	export const Creatable = OperationCreatable
}
