import { isly } from "isly"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Batch } from "../Batch"
import { Fee } from "../Fee"

export interface Capture extends Capture.Creatable {
	status: "succeeded" | "failed"
	reason?: string
}

export namespace Capture {
	export function from(creatable: Creatable): Capture {
		return {
			status: "succeeded",
			...creatable,
		}
	}
	export interface Creatable {
		type: "capture"
		authorization: Authorization
		collect: { settlementTransaction: string; feeTransaction: string }
		reference: string // card transaction
		batch: Batch
		fee: Fee
		amount: Amount
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("capture"),
			authorization: Authorization.type,
			reference: isly.string(),
			fee: Fee.type,
			amount: Amount.type,
			batch: Batch.type,
		})
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = Creatable.type.extend<Capture>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
