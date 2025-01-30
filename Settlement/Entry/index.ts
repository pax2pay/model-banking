import { isoly } from "isoly"
import { Acquirer } from "../../Acquirer"
import { Amount } from "../../Amount"
import { Card } from "../../Card"
import { Merchant } from "../../Merchant"
import { Rail } from "../../Rail"
import { Batch } from "../Batch"
import { Fee } from "../Fee"
import { Identifier as SettlementIdentifier } from "../Identifier"
import { Entry as LegacyEntry } from "./Legacy"

export interface Entry extends Omit<Entry.Creatable.Known, "transaction" | "card"> {
	status: "succeeded"
	card: Rail.Address.Card
	transaction: string
	created: isoly.DateTime
}
export namespace Entry {
	export import Legacy = LegacyEntry
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
	function toFailed(legacy: Legacy.Unknown | Legacy.Cancel): Failed {
		return {
			type: "unknown",
			status: "failed",
			data: legacy.type == "cancel" ? legacy : legacy.data,
			reason: legacy.reason ?? "unknown",
			created: legacy.created ?? isoly.DateTime.now(),
			settlement: legacy.settlement ?? "unknown",
			reference: ("reference" in legacy && legacy.reference) || "unknown",
			batch: legacy.batch,
			...("authorization" in legacy &&
				legacy.authorization && {
					account: legacy.authorization.account ?? "unknown",
					approvalCode: legacy.authorization.approvalCode,
					merchant: legacy.authorization.merchant,
					acquirer: legacy.authorization.acquirer,
					card: legacy.authorization.card.id,
					transaction: legacy.authorization.transaction?.id,
				}),
			...("fee" in legacy && { fee: legacy.fee }),
			...("amount" in legacy && { amount: legacy.amount }),
		}
	}
	function toEntry(legacy: Legacy.Capture | Legacy.Refund, card?: Rail.Address.Card): Entry | Failed {
		return {
			type: legacy.type,
			created: legacy.created ?? isoly.DateTime.now(),
			...(legacy.status == "failed"
				? {
						card: legacy.type == "refund" ? legacy.card : legacy.authorization.card.id,
						status: "failed",
						reason: legacy.reason ?? "unknown",
				  }
				: {
						card: card ?? {
							type: "card",
							scheme: (stack => (stack ? Card.Stack.toScheme(stack) : "unknown"))(
								legacy.settlement && SettlementIdentifier.toProcessor(legacy.settlement)
							) as Card.Scheme,
							...(legacy.type == "refund"
								? { id: legacy.card, iin: "unknown", last4: "unknown" }
								: {
										id: legacy.authorization.card.id,
										iin: legacy.authorization.card.iin ?? "unknown",
										last4: legacy.authorization.card.last4 ?? "unknown",
								  }),
							expiry: [0, 0] as unknown as Card.Expiry,
							holder: "unknown",
						},
						status: "succeeded",
				  }),
			transaction:
				("transaction" in legacy
					? legacy.transaction?.id
					: "authorization" in legacy && "transaction" in legacy.authorization
					? legacy.authorization.transaction?.id
					: "unknown") ?? "unknown",
			account: legacy.account ?? (("transaction" in legacy && legacy.transaction?.accountId) || "unknown"),
			approvalCode: legacy.authorization.approvalCode ?? "unknown",
			...(legacy.type == "refund"
				? { merchant: legacy.merchant, acquirer: legacy.acquirer }
				: { merchant: legacy.authorization.merchant, acquirer: legacy.authorization.acquirer }),
			reference: legacy.reference,
			batch: legacy.batch,
			fee: legacy.fee,
			amount: legacy.amount,
			settlement: legacy.settlement ?? "unknown",
		}
	}
	export function fromLegacy(legacy: LegacyEntry): Entry | Entry.Failed {
		return legacy.type == "cancel" || legacy.type == "unknown" ? toFailed(legacy) : toEntry(legacy)
	}
}
