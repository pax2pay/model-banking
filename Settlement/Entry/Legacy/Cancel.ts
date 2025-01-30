import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../../Amount"
import { Authorization } from "../../../Authorization"
import { Batch } from "../../Batch"
import { Fee } from "../../Fee"
import { Identifier as SettlementIdentifier } from "../../Identifier"

export interface Cancel extends Omit<Cancel.Creatable, "settlement"> {
	status: "succeeded" | "failed"
	reason?: string
	created?: isoly.DateTime
	settlement?: SettlementIdentifier
}
export namespace Cancel {
	export interface Creatable {
		type: "cancel"
		authorization?: Authorization
		reference?: string
		batch: Batch
		fee?: Fee
		amount?: Amount
		settlement: SettlementIdentifier
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("cancel"),
			authorization: Authorization.type.optional(),
			reference: isly.string().optional(),
			fee: Fee.type.optional(),
			amount: Amount.type.optional(),
			batch: Batch.type,
			settlement: SettlementIdentifier.type,
		})
	}
	export const type = Creatable.type.omit(["settlement"]).extend<Cancel>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		settlement: SettlementIdentifier.type.optional(),
	})
}
