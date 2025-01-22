import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Identifier as SettlementIdentifier } from "../../Settlement/Identifier"
import { Transaction } from "../../Transaction"
import { Batch } from "../Batch"
import { Fee } from "../Fee"

export interface Cancel extends Omit<Cancel.Creatable, "settlement" | "transaction"> {
	status: "succeeded" | "failed"
	reason?: string
	transaction?: Transaction.CardTransaction | string //Can only be string if status is failed.
	created?: isoly.DateTime
	settlement?: SettlementIdentifier
}
export namespace Cancel {
	export function from(creatable: Creatable, transaction: Transaction.CardTransaction): Cancel {
		return { status: "succeeded", ...creatable, transaction, created: isoly.DateTime.now() }
	}
	export function fromLegacy(
		entry: Cancel,
		transaction: Transaction.CardTransaction | string,
		card: string,
		account: string,
		approvalCode: string
	): Cancel {
		return { ...entry, transaction, card, account, approvalCode }
	}
	export interface Creatable {
		type: "cancel"
		authorization?: Authorization //Legacy
		reference?: string
		transaction?: string
		card?: string
		account?: string
		approvalCode?: string
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
			transaction: isly.string().optional(),
			card: isly.string().optional(),
			account: isly.string().optional(),
			approvalCode: isly.string().optional(),
			fee: Fee.type.optional(),
			amount: Amount.type.optional(),
			batch: Batch.type,
			settlement: SettlementIdentifier.type,
		})
	}
	export const type = Creatable.type.omit(["settlement", "transaction"]).extend<Cancel>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
		transaction: isly.union<any>(Transaction.type, isly.string()).optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is).optional(),
		settlement: SettlementIdentifier.type.optional(),
	})
}
