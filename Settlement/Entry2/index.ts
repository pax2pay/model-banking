import { isoly } from "isoly"
import { Acquirer } from "../../Acquirer"
import { Amount } from "../../Amount"
import { Merchant } from "../../Merchant"
import { Rail } from "../../Rail"
import { Batch } from "../Batch"
import { Fee } from "../Fee"
import { Identifier as SettlementIdentifier } from "../Identifier"

export interface Entry extends Omit<Entry.Creatable.Known, "transaction" | "card"> {
	status: "succeeded"
	card: Rail.Address.Card
	transaction: string
	created: isoly.DateTime
}
export namespace Entry {
	export type Creatable = Creatable.Known | Creatable.Unknown
	export namespace Creatable {
		export interface Known {
			type: "capture" | "refund"
			card: string
			transaction?: string
			account: string
			approvalCode: string
			merchant: Merchant
			acquirer: Acquirer
			reference: string
			batch: Batch
			fee: Fee
			amount: Amount
			settlement: SettlementIdentifier
		}
		export interface Unknown extends Partial<Omit<Known, "type">> {
			type: "unknown"
			data: Record<string, unknown>
		}
	}
	export type Failed = Creatable & {
		status: "failed"
		reason: string
		created: isoly.DateTime
	}
}
