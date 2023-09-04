import { isly } from "isly"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Fee } from "../Fee"

export interface Refund extends Refund.Creatable {
	status: "succeeded" | "failed"
}

export namespace Refund {
	export interface Creatable {
		type: "refund"
		authorization?: Authorization
		reference: string
		fee?: Fee
		amount?: Amount
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("refund"),
			authorization: Authorization.type.optional(),
			reference: isly.string(),
			fee: Fee.type.optional(),
			amount: Amount.type.optional(),
		})
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = Creatable.type.extend<Refund>({
		status: isly.string(["succeeded", "failed"]),
	})
	export const is = type.is
	export const flaw = type.flaw
}
