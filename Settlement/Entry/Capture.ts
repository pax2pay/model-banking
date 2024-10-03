import { isly } from "isly"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Batch } from "../Batch"
import { Fee } from "../Fee"

export interface Capture extends Capture.Creatable {
	status: "succeeded" | "failed"
	charge?: Amount
	account: string | "unknown"
	reason?: string
}
export namespace Capture {
	export function from(creatable: Creatable, account: string): Capture {
		return {
			status: "succeeded",
			account,
			...creatable,
		}
	}
	export interface Creatable {
		type: "capture"
		authorization: Authorization
		reference: string // card transaction
		batch: Batch
		fee: Fee
		amount?: Amount // deprecated; prefer net
		net?: Amount
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("capture"),
			authorization: Authorization.type,
			reference: isly.string(),
			fee: Fee.type,
			amount: Amount.type.optional(),
			net: Amount.type.optional(),
			batch: Batch.type,
		})
	}
	export const type = Creatable.type.extend<Capture>({
		status: isly.string(["succeeded", "failed"]),
		account: isly.string(),
		charge: Amount.type.optional(),
		reason: isly.string().optional(),
	})
}
