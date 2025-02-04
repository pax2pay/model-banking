import { isoly } from "isoly"
import { isly } from "isly"
import { Authorization } from "../../Authorization"
import { Identifier as SettlementIdentifier } from "../../Settlement/Identifier"
import { Batch } from "../Batch"

export interface Unknown extends Omit<Unknown.Creatable, "settlement"> {
	status: "succeeded" | "failed"
	reason?: string
	created?: isoly.DateTime
	settlement?: SettlementIdentifier
}
export namespace Unknown {
	export interface Creatable {
		type: "unknown"
		authorization?: Authorization
		data: Record<string, any>
		batch: Batch
		settlement: SettlementIdentifier
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("unknown"),
			authorization: Authorization.type.optional(),
			data: isly.record(isly.string(), isly.any()),
			batch: Batch.type,
			settlement: SettlementIdentifier.type,
		})
	}
	export function from(creatable: Creatable): Unknown {
		return { ...creatable, status: "failed" }
	}
	export const type = Creatable.type.omit(["settlement"]).extend<Unknown>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is).optional(),
		settlement: SettlementIdentifier.type.optional(),
	})
}
