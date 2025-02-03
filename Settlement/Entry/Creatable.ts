import { isly } from "isly"
import { Acquirer } from "../../Acquirer"
import { Amount } from "../../Amount"
import { Merchant } from "../../Merchant"
import { Batch } from "../Batch"
import { Fee } from "../Fee"
import { Identifier as SettlementIdentifier } from "../Identifier"
import { Entry as LegacyEntry } from "./Legacy"

export type Creatable = Creatable.Known | Creatable.Unknown
export namespace Creatable {
	export interface Capture extends Base {
		type: "capture"
	}
	export interface Refund extends Base {
		type: "refund"
	}
	export type Known = Capture | Refund
	interface Base {
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
		export function fromLegacy(
			maybeLegacy: Creatable.Known | LegacyEntry.Capture.Creatable | LegacyEntry.Refund.Creatable
		): Creatable.Known {
			return type.is(maybeLegacy)
				? maybeLegacy
				: {
						type: maybeLegacy.type,
						card: maybeLegacy.type == "refund" ? maybeLegacy.card : maybeLegacy.authorization.card.id,
						transaction:
							("authorization" in maybeLegacy &&
								"transaction" in maybeLegacy.authorization &&
								maybeLegacy.authorization.transaction?.id) ||
							undefined,
						account:
							maybeLegacy.account ||
							("authorization" in maybeLegacy &&
								"account" in maybeLegacy.authorization &&
								maybeLegacy.authorization.account) ||
							"unknown",
						approvalCode: maybeLegacy.authorization.approvalCode ?? "unknown",
						...(maybeLegacy.type == "refund"
							? { merchant: maybeLegacy.merchant, acquirer: maybeLegacy.acquirer }
							: { merchant: maybeLegacy.authorization.merchant, acquirer: maybeLegacy.authorization.acquirer }),
						reference: maybeLegacy.reference,
						batch: maybeLegacy.batch,
						fee: maybeLegacy.fee,
						amount: maybeLegacy.amount,
						settlement: maybeLegacy.settlement ?? "unknown",
				  }
		}
	}
	export interface Unknown extends Partial<Base> {
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
