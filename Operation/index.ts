import { isoly } from "isoly"
import { isly } from "isly"
import { Changes as OperationChanges } from "./Changes"
import { Creatable as OperationCreatable } from "./Creatable"

export interface Operation extends OperationCreatable {
	transaction: string
	counter: number
	created: isoly.DateTime
	// signature: string //TODO: add chained signatures.
}
export namespace Operation {
	export const type = OperationCreatable.type.extend<Operation>({
		transaction: isly.string(),
		counter: isly.number(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function fromCreatable(transaction: string, creatable: Creatable): Operation {
		const timestamp = isoly.DateTime.now()
		return {
			...creatable,
			transaction,
			counter: 0,
			created: timestamp,
		}
	}
	export type Creatable = OperationCreatable
	export const Creatable = OperationCreatable
	export type Changes = OperationChanges
	export const Changes = OperationChanges
	export namespace Changes {
		export type Entry = OperationChanges.Entry
	}
}
