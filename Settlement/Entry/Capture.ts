import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Identifier as SettlementIdentifier } from "../../Settlement/Identifier"
import { Batch } from "../Batch"
import { Fee } from "../Fee"

export interface Capture extends Capture.Creatable {
	status: "succeeded" | "failed"
	reason?: string
	settlement?: SettlementIdentifier
}
export namespace Capture {
	export function from(creatable: Creatable, settlement?: SettlementIdentifier): Capture {
		return { settlement, status: "succeeded", ...creatable }
	}
	export interface Creatable {
		type: "capture"
		account?: string // Only defined when using the new card id + account id card references
		authorization: Authorization
		reference: string // card transaction
		batch: Batch
		fee: Fee
		amount: Amount
		created?: isoly.DateTime
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("capture"),
			account: isly.string().optional(),
			authorization: Authorization.type,
			reference: isly.string(),
			fee: Fee.type,
			amount: Amount.type,
			batch: Batch.type,
			created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		})
	}
	export const type = Creatable.type.extend<Capture>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
		settlement: isly.string().optional(),
	})
}
