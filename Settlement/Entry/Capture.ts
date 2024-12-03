import { isly } from "isly"
import { Amount } from "../../Amount"
import { Authorization } from "../../Authorization"
import { Batch } from "../Batch"
import { Fee } from "../Fee"
import { Identifier as SettlementIdentifier } from "../Identifier"

export interface Capture extends Capture.Creatable {
	status: "succeeded" | "failed"
	reason?: string
}
export namespace Capture {
	export function from(creatable: Creatable): Capture {
		return { status: "succeeded", ...creatable }
	}
	export interface Creatable {
		type: "capture"
		account?: string // Only defined when using the new card id + account id card references
		authorization: Authorization
		reference?: Batch
		settlement: SettlementIdentifier | string // string is deprecated and there for legacy reasons
		fee: Fee
		amount: Amount
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("capture"),
			account: isly.string().optional(),
			authorization: Authorization.type,
			reference: Batch.type.optional(),
			fee: Fee.type,
			amount: Amount.type,
			settlement: isly.union(SettlementIdentifier.type, isly.string()),
		})
	}
	export const type = Creatable.type.extend<Capture>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
	})
}
