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
	created?: isoly.DateTime
}
export namespace Capture {
	export function from(creatable: Creatable): Capture {
		return { status: "succeeded", ...creatable, created: isoly.DateTime.now() }
	}
	export interface Creatable {
		type: "capture"
		account?: string // Only defined when using the new card id + account id card references
		authorization: Authorization
		reference: string // card transaction
		batch: Batch
		fee: Fee
		amount: Amount
		settlement?: SettlementIdentifier
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
			settlement: isly.string().optional(),
		})
	}
	export const type = Creatable.type.extend<Capture>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is).optional(),
	})
}
