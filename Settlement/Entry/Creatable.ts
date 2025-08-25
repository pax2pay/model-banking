import { isly } from "isly"
import { Acquirer } from "../../Acquirer"
import { Amount } from "../../Amount"
import { Merchant } from "../../Merchant"
import { Exchange } from "../../Transaction/Exchange"
import { Batch } from "../Batch"
import { Fee } from "../Fee"
import { Identifier as SettlementIdentifier } from "../Identifier"
import { Entry as LegacyEntry } from "./Legacy"

export type Creatable = Creatable.Known | Creatable.Unknown
export namespace Creatable {
	export interface Base {
		card: string
		transaction?: string
		account: string
		approvalCode: string
		merchant: Merchant
		acquirer: Acquirer
		reference: string
		batch: Batch
		// fee: Fee
		// amount: Amount
		amount: {
			net: number
			fee: { scheme: number; interchange: number }
		}
		settlement: SettlementIdentifier
		exchange?: Exchange
	}
	export namespace Base {
		export const type = isly.object<Base>({
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
			exchange: Exchange.type.optional(),
		})
	}
	export interface Capture extends Base {
		type: "capture"
	}
	export namespace Capture {
		export const type = Base.type.extend<Capture>({
			type: isly.string("capture"),
		})
		export function fromLegacy(maybeLegacy: Capture | LegacyEntry.Capture.Creatable): Capture {
			return type.is(maybeLegacy)
				? maybeLegacy
				: {
						type: maybeLegacy.type,
						card: maybeLegacy.authorization.card.id,
						transaction: maybeLegacy.authorization.transaction?.id,
						account: maybeLegacy.authorization.account || "unknown",
						approvalCode: maybeLegacy.authorization.approvalCode ?? "unknown",
						merchant: maybeLegacy.authorization.merchant,
						acquirer: maybeLegacy.authorization.acquirer,
						reference: maybeLegacy.reference,
						batch: maybeLegacy.batch,
						fee: maybeLegacy.fee,
						amount: maybeLegacy.amount,
						settlement: maybeLegacy.settlement ?? "unknown",
				  }
		}
	}
	export interface Refund extends Base {
		type: "refund"
	}
	export namespace Refund {
		export const type = Base.type.extend<Refund>({
			type: isly.string("refund"),
		})
		export function fromLegacy(maybeLegacy: Refund | LegacyEntry.Refund.Creatable): Refund {
			return type.is(maybeLegacy)
				? maybeLegacy
				: {
						type: maybeLegacy.type,
						card: maybeLegacy.card,
						account: maybeLegacy.account ?? "unknown",
						approvalCode: maybeLegacy.authorization.approvalCode ?? "unknown",
						merchant: maybeLegacy.merchant,
						acquirer: maybeLegacy.acquirer,
						reference: maybeLegacy.reference,
						batch: maybeLegacy.batch,
						fee: maybeLegacy.fee,
						amount: maybeLegacy.amount,
						settlement: maybeLegacy.settlement ?? "unknown",
				  }
		}
	}
	export type Known = Capture | Refund

	export namespace Known {
		export const type = isly.union(Capture.type, Refund.type)
		export function fromLegacy(
			maybeLegacy: Creatable.Known | LegacyEntry.Capture.Creatable | LegacyEntry.Refund.Creatable
		): Creatable.Known {
			return maybeLegacy.type == "capture" ? Capture.fromLegacy(maybeLegacy) : Refund.fromLegacy(maybeLegacy)
		}
	}
	export interface Unknown extends Partial<Base> {
		type: "unknown"
		data: Record<string, unknown>
	}
	export namespace Unknown {
		export const type = isly.object<Unknown>({
			...(Object.fromEntries(
				Object.entries(Base.type.getProperties()).map(([k, v]) => [k, v.optional()])
			) as isly.object.Properties<Partial<Base>>), // TODO: Add "Partial" to isly
			type: isly.string("unknown"),
			data: isly.record<Record<string, unknown>>(isly.string(), isly.any()),
		})
	}
	export const type = isly.union(Known.type, Unknown.type)
}
