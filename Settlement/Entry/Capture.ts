import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Identifier as SettlementIdentifier } from "../../Settlement/Identifier"
import { Transaction } from "../../Transaction"
import { Batch } from "../Batch"
import { Fee } from "../Fee"

export interface Capture extends Omit<Capture.Creatable, "settlement"> {
	status: "succeeded" | "failed"
	reason?: string
	created?: isoly.DateTime
	settlement?: SettlementIdentifier
	transaction?: Transaction.CardTransaction
}
export namespace Capture {
	export function from(creatable: Creatable, transaction: Transaction.CardTransaction): Capture {
		return { status: "succeeded", ...creatable, transaction, created: isoly.DateTime.now() }
	}
	export interface Creatable {
		type: "capture"
		card?: string
		account?: string // Only defined when using the new card id + account id card references
		authorization: Authorization
		reference: string // card transaction
		batch: Batch
		fee: Fee
		amount: Amount
		settlement: SettlementIdentifier
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("capture"),
			card: isly.string().optional(),
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
		transaction: isly.any().optional(),
	})
}
