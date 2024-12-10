import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Identifier as SettlementIdentifier } from "../../Settlement/Identifier"
import { Batch } from "../Batch"
import { Fee } from "../Fee"

export interface Capture extends Omit<Capture.Creatable, "settlement"> {
	status: "succeeded" | "failed"
	reason?: string
	created?: isoly.DateTime
	settlement?: SettlementIdentifier
}
export namespace Capture {
	export function from(creatable: Creatable): Capture {
		return { status: "succeeded", ...creatable, created: isoly.DateTime.now() }
	}
	export interface Creatable {
		type: "capture"
		account?: string // Only defined when using the new card id + account id card references - will be deprecated
		authorization: Authorization // Replace with CardTransaction
		reference: string // card transaction - will be deprecated
		batch: Batch
		fee: Fee
		amount: Amount
		settlement: SettlementIdentifier
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
			settlement: SettlementIdentifier.type,
		})
	}
	export const type = Creatable.type.omit(["settlement"]).extend<Capture>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is).optional(),
		settlement: SettlementIdentifier.type.optional(),
	})
}
