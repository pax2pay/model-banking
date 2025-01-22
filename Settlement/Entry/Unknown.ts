import { isoly } from "isoly"
import { isly } from "isly"
import { Authorization } from "../../Authorization"
import { Identifier as SettlementIdentifier } from "../../Settlement/Identifier"
import { Transaction } from "../../Transaction"
import { Batch } from "../Batch"

export interface Unknown extends Omit<Unknown.Creatable, "settlement" | "transaction"> {
	status: "succeeded" | "failed"
	reason?: string
	transaction?: Transaction.CardTransaction | string //Can only be string if status is failed.
	created?: isoly.DateTime
	settlement?: SettlementIdentifier
}

export namespace Unknown {
	export function fromLegacy(
		entry: Unknown,
		card?: string,
		account?: string,
		transaction?: Transaction.CardTransaction | string,
		approvalCode?: string
	): Unknown {
		return { ...entry, transaction, card, account, approvalCode }
	}
	export interface Creatable {
		type: "unknown"
		card?: string
		account?: string // Only defined when using the new card id + account id card references
		authorization?: Authorization //Legacy
		transaction?: string
		approvalCode?: string
		reference?: string // card transaction
		data: Record<string, any>
		batch: Batch
		settlement: SettlementIdentifier
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("unknown"),
			card: isly.string().optional(),
			account: isly.string().optional(),
			authorization: Authorization.type.optional(),
			transaction: isly.string().optional(),
			approvalCode: isly.string().optional(),
			reference: isly.string().optional(),
			data: isly.record(isly.string(), isly.any()),
			batch: Batch.type,
			settlement: SettlementIdentifier.type,
		})
	}
	export function from(creatable: Creatable, transaction?: Transaction.CardTransaction | string): Unknown {
		return { ...creatable, status: "failed", transaction }
	}
	export const type = Creatable.type.omit(["settlement", "transaction"]).extend<Unknown>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
		transaction: isly.union<any>(Transaction.type, isly.string()).optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is).optional(),
		settlement: SettlementIdentifier.type.optional(),
	})
}
