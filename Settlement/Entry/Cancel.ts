import { isly } from "isly"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Batch } from "../Batch"
import { Fee } from "../Fee"

export interface Cancel extends Cancel.Creatable {
	status: "succeeded" | "failed"
	reason?: string
}

export namespace Cancel {
	export interface Creatable {
		type: "cancel"
		authorization?: Authorization
		reference: string
		batch: Batch
		fee?: Fee
		amount?: Amount
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("cancel"),
			authorization: Authorization.type.optional(),
			reference: isly.string(),
			fee: Fee.type.optional(),
			amount: Amount.type.optional(),
			batch: Batch.type,
		})
		export const is = type.is
		export const flaw = type.flaw
	}
	export const type = Creatable.type.extend<Cancel>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
