import { isoly } from "isoly"
import { isly } from "isly"
import { Changes as OperationChanges } from "./Changes"
import { Creatable as OperationCreatable } from "./Creatable"
import { Signer as OperationSigner } from "./Signer"

export interface Operation extends OperationCreatable {
	transaction: string
	counter: number
	created: isoly.DateTime
	signature?: string
	previous?: string
}
export namespace Operation {
	export function sum(operations: Operation[]): Changes.Sum {
		const result: Changes.Sum = {}
		for (const operation of operations) {
			Object.entries(operation.changes).forEach(([entry, change]) => {
				result[entry as Changes.Entry.Balance] = isoly.Currency[change.type](
					operation.currency,
					result[entry as Changes.Entry.Balance] ?? 0,
					change.amount
				)
			})
		}
		return result
	}
	export const Signer = OperationSigner
	export type Creatable = OperationCreatable
	export const Creatable = OperationCreatable
	export import Changes = OperationChanges
	export const type = OperationCreatable.type.extend<Operation>({
		transaction: isly.string(),
		counter: isly.number(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		signature: isly.string().optional(),
		previous: isly.string().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export function fromCreatable(transaction: string, creatable: Creatable): Operation {
		return {
			...creatable,
			transaction,
			counter: 0,
			created: isoly.DateTime.now(),
		}
	}
}
