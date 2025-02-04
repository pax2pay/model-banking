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

export interface Refund extends Omit<Refund.Creatable, "settlement"> {
	status: "succeeded" | "failed"
	reason?: string
	transaction?: Transaction
	created?: isoly.DateTime
	settlement?: SettlementIdentifier
}
export namespace Refund {
	export interface Creatable {
		type: "refund"
		card: string
		account?: string // Only defined when using the new card id + account id card references
		authorization: Pick<Authorization, "approvalCode">
		merchant: Merchant
		acquirer: Acquirer
		reference: string
		batch: Batch
		fee: Fee
		amount: Amount
		settlement: SettlementIdentifier
	}
	export function from(refund: Refund.Creatable, transaction: Transaction): Refund {
		return { ...refund, status: "succeeded", transaction, created: isoly.DateTime.now() }
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("refund"),
			card: isly.string(),
			account: isly.string().optional(),
			authorization: isly.object({ approvalCode: isly.string() }),
			merchant: Merchant.type,
			acquirer: Acquirer.type,
			reference: isly.string(),
			fee: Fee.type,
			amount: Amount.type,
			batch: Batch.type,
			settlement: SettlementIdentifier.type,
		})
	}
	export const type = Creatable.type.omit(["settlement"]).extend<Refund>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
		transaction: Transaction.type.optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is).optional(),
		settlement: SettlementIdentifier.type.optional(),
	})
}
