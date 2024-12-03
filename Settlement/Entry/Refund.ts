import { isly } from "isly"
import { Acquirer } from "../../Acquirer"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Merchant } from "../../Merchant"
import { Transaction } from "../../Transaction"
import { Batch } from "../Batch"
import { Fee } from "../Fee"
import { Identifier as SettlementIdentifier } from "../Identifier"

export interface Refund extends Refund.Creatable {
	status: "succeeded" | "failed"
	reason?: string
	transaction?: Transaction
}

export namespace Refund {
	export interface Creatable {
		type: "refund"
		card: string
		account?: string // Only defined when using the new card id + account id card references
		authorization: Pick<Authorization, "approvalCode">
		merchant: Merchant
		acquirer: Acquirer
		reference?: Batch
		settlement: SettlementIdentifier
		fee: Fee
		amount: Amount
	}
	export function from(refund: Refund.Creatable, transaction: Transaction): Refund {
		return { ...refund, status: "succeeded", transaction }
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("refund"),
			card: isly.string(),
			account: isly.string().optional(),
			authorization: isly.object({ approvalCode: isly.string() }),
			merchant: Merchant.type,
			acquirer: Acquirer.type,
			reference: Batch.type.optional(),
			fee: Fee.type,
			amount: Amount.type,
			settlement: SettlementIdentifier.type,
		})
	}
	export const type = Creatable.type.extend<Refund>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
		transaction: Transaction.type.optional(),
	})
}
