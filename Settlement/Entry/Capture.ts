import { isly } from "isly"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Fee } from "../Fee"

export interface Capture extends Capture.Creatable {
	status: "succeeded" | "failed"
	authorization?: Authorization
}

export namespace Capture {
	export interface Creatable {
		type: "capture"
		reference: string
		fee?: Fee
		amount?: Amount
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("capture"),
			reference: isly.string(),
			fee: Fee.type.optional(),
			amount: Amount.type.optional(),
		})
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = Creatable.type.extend<Capture>({
		status: isly.string(["succeeded", "failed"]),
		authorization: Authorization.type.optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
