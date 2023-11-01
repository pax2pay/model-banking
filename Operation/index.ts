import { isoly } from "isoly"
import { isly } from "isly"
import { Changes as OperationChanges } from "./Changes"
import { Creatable as OperationCreatable } from "./Creatable"

export interface Operation extends OperationCreatable {
	transaction: string
	counter: number
	created: isoly.DateTime
	signature?: string
}
export namespace Operation {
	export type Creatable = OperationCreatable
	export const Creatable = OperationCreatable
	export type Changes = OperationChanges
	export const Changes = OperationChanges
	export namespace Changes {
		export type Entry = OperationChanges.Entry
	}
	export const type = OperationCreatable.type.extend<Operation>({
		transaction: isly.string(),
		counter: isly.number(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		signature: isly.string().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
	//TODO: actual signing function
	function sign(precursor: string): string | undefined {
		const signature = Number.parseInt(precursor)
		return Number.isNaN(signature) ? undefined : (signature + 1).toString()
	}
	export function fromCreatable(transaction: string, creatable: Creatable, oldSignature: string): Operation {
		return {
			...creatable,
			transaction,
			counter: 0,
			created: isoly.DateTime.now(),
			signature: sign(oldSignature),
		}
	}
}
