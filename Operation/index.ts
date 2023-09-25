import { isoly } from "isoly"
import { isly } from "isly"
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
	export function fromCreatable(transaction: string, creatable: Creatable): Operation {
		const timestamp = isoly.DateTime.now()
		return {
			...creatable,
			transaction,
			counter: 0,
			created: timestamp,
		}
	}
	// export function validate(operation: Operation): boolean {
	// 	return operation.change.actual.
	// }

	export type Creatable = OperationCreatable
	export const Creatable = OperationCreatable
}
