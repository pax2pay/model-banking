import { isoly } from "isoly"
import { isly } from "isly"
import { Acquirer } from "../../Acquirer"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Merchant } from "../../Merchant"
import { Identifier as SettlementIdentifier } from "../../Settlement/Identifier"
import { Transaction } from "../../Transaction"
import { Batch } from "../Batch"
import { Fee } from "../Fee"

export interface Capture extends Omit<Capture.Creatable, "settlement"> {
	status: "succeeded" | "failed"
	reason?: string
	transaction?: string
	created?: isoly.DateTime
	settlement?: SettlementIdentifier
}
export namespace Capture {
	export function from(creatable: Creatable, transaction: Transaction): Capture {
		return { status: "succeeded", ...creatable, created: isoly.DateTime.now(), transaction: transaction.id }
	}
	export interface Creatable {
		type: "capture"
		account?: string // Only defined when using the new card id + account id card references
		authorization: Pick<Authorization, "approvalCode">
		card: string
		reference: string // card transaction
		merchant: Merchant
		acquirer: Acquirer
		batch: Batch
		fee: Fee
		amount: Amount
		settlement: SettlementIdentifier
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("capture"),
			account: isly.string().optional(),
			authorization: isly.object({ approvalCode: isly.string() }),
			card: isly.string(),
			reference: isly.string(),
			merchant: Merchant.type,
			acquirer: Acquirer.type,
			fee: Fee.type,
			amount: Amount.type,
			batch: Batch.type,
			settlement: SettlementIdentifier.type,
		})
	}
	export const type = Creatable.type.omit(["settlement"]).extend<Capture>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
		transaction: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is).optional(),
		settlement: SettlementIdentifier.type.optional(),
	})
}
