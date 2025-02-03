import { isly } from "isly"
import { Acquirer } from "../../Acquirer"
import { Amount } from "../../Amount"
import { Merchant } from "../../Merchant"
import { Batch } from "../Batch"
import { Fee } from "../Fee"
import { Identifier as SettlementIdentifier } from "../Identifier"

export type Creatable = Creatable.Known | Creatable.Unknown
export namespace Creatable {
	export interface Capture extends Known {
		type: "capture"
	}
	export interface Refund extends Known {
		type: "refund"
	}
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
	export namespace Known {
		export const type = isly.object<Known>({
			type: isly.string<"capture" | "refund">(["capture", "refund"]),
			card: isly.string(),
			transaction: isly.string().optional(),
			account: isly.string(),
			approvalCode: isly.string(),
			merchant: Merchant.type,
			acquirer: Acquirer.type,
			reference: isly.string(),
			batch: Batch.type,
			fee: Fee.type,
			amount: Amount.type,
			settlement: SettlementIdentifier.type,
		})
	}
	export interface Unknown extends Partial<Omit<Known, "type">> {
		type: "unknown"
		data: Record<string, unknown>
	}
	export namespace Unknown {
		export const type = isly.object<Unknown>({
			...(Object.fromEntries(
				Object.entries(Known.type.omit<"type">(["type"]).getProperties()).map(([k, v]) => [k, v.optional()])
			) as isly.object.Properties<Partial<Omit<Known, "type">>>), // TODO: Add "Partial" to isly
			type: isly.string("unknown"),
			data: isly.record<Record<string, unknown>>(isly.string(), isly.any()),
		})
	}
	export const type = isly.union(Known.type, Unknown.type)
}
