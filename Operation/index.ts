import * as cryptly from "cryptly"
import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../Rail"
import type { Transaction } from "../Transaction"
import { Creatable as OperationCreatable } from "./Creatable"

export interface Operation extends OperationCreatable {
	transaction: { id: cryptly.Identifier; rail: Rail }
	counter: number
	created: isoly.DateTime
	// signature: string //TODO: add chained signatures.
}
export namespace Operation {
	export const type = OperationCreatable.type.extend<Operation>({
		transaction: isly.object({ id: isly.fromIs("cryptly.Identifier", cryptly.Identifier.is), rail: Rail.type }),
		counter: isly.number(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
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
