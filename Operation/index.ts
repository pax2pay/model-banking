import { isoly } from "isoly"
import { isly } from "isly"
import { Changes as OperationChanges } from "./Changes"
import { Creatable as OperationCreatable } from "./Creatable"
import { Signer as OperationSigner } from "./Signer"

export interface Operation extends OperationCreatable {
	transaction?: string
	counter: number
	created: isoly.DateTime
	signature?: string
	previous?: string
}
export namespace Operation {
	export const Signer = OperationSigner
	export type Creatable = OperationCreatable
	export const Creatable = OperationCreatable
	export type Changes = OperationChanges
	export const Changes = OperationChanges
	export namespace Changes {
		export type Entry = OperationChanges.Entry
		export namespace Entry {
			export type Counterbalance = OperationChanges.Entry.Counterbalance
		}
	}
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
