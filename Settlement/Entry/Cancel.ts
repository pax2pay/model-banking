import { isly } from "isly"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Batch } from "../Batch"
import { Fee } from "../Fee"
import { Identifier as SettlementIdentifier } from "../Identifier"

export interface Cancel extends Cancel.Creatable {
	status: "succeeded" | "failed"
	reason?: string
}

export namespace Cancel {
	export interface Creatable {
		type: "cancel"
		authorization?: Authorization
		reference?: Batch
		settlement: SettlementIdentifier
		fee?: Fee
		amount?: Amount
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("cancel"),
			authorization: Authorization.type.optional(),
			reference: Batch.type.optional(),
			fee: Fee.type.optional(),
			amount: Amount.type.optional(),
			settlement: SettlementIdentifier.type,
		})
	}
	export const type = Creatable.type.extend<Cancel>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
	})
}
