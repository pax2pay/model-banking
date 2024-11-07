import { isoly } from "isoly"
import { isly } from "isly"
import { buffer as operationBuffer } from "./buffer"
import { cancel as operationCancel } from "./cancel"
import { Change as OperationChange } from "./Change"
import { Changes as OperationChanges } from "./Changes"
import { collect as operationCollect } from "./collect"
import { Creatable as OperationCreatable } from "./Creatable"
import { fund as operationFund } from "./fund"
import { incoming as operationIncoming } from "./incoming"
import { outgoing as operationOutgoing } from "./outgoing"
import { refund as operationRefund } from "./refund"
import { Signer as OperationSigner } from "./Signer"

export interface Operation extends OperationCreatable {
	transaction: string
	counter: number
	created: isoly.DateTime
	signature?: string
	previous?: string
}
export namespace Operation {
	// This pr changed the type https://github.com/pax2pay/worker-banking-ledger/pull/1493
	export function available(operation: Operation, currency: isoly.Currency): number {
		return OperationChanges.available(operation.changes, currency, operation.created <= "2024-09-13T13:26:00.001Z")
	}
	export const Signer = OperationSigner
	export import Creatable = OperationCreatable
	export import Changes = OperationChanges
	export import Change = OperationChange
	export const type = OperationCreatable.type.extend<Operation>({
		transaction: isly.string(),
		counter: isly.number(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		signature: isly.string().optional(),
		previous: isly.string().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export const buffer = operationBuffer
	export const cancel = operationCancel
	export const collect = operationCollect
	export const fund = operationFund
	export const incoming = operationIncoming
	export const outgoing = operationOutgoing
	export const refund = operationRefund
	export const sum = Changes.sum
	export function fromCreatable(transaction: string, creatable: Creatable): Operation {
		return { ...creatable, transaction, counter: 0, created: isoly.DateTime.now() }
	}
}
