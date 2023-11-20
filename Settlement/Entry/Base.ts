import { isly } from "isly"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Fee } from "../Fee"

export interface Base extends Base.Creatable {
	status: "succeeded" | "failed"
	authorization: Authorization
}

export namespace Base {
	export interface Creatable {
		card: string
		reference: string
		fee?: Fee
		amount?: Amount
		raw?: Record<string, any>
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			card: isly.string(),
			reference: isly.string(),
			fee: Fee.type.optional(),
			amount: Amount.type.optional(),
			raw: isly.record<Record<string, any>>(isly.string(), isly.any()),
		})
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = Creatable.type.extend<Base>({
		authorization: Authorization.type,
		status: isly.string(["succeeded", "failed"]),
	})
	export const is = type.is
	export const flaw = type.flaw
}
