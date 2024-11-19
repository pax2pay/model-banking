import { isly } from "isly"
import { Authorization } from "../../Authorization"
import { Batch } from "../Batch"

export interface Unknown extends Unknown.Creatable {
	status: "succeeded" | "failed"
	reason?: string
}

export namespace Unknown {
	export interface Creatable {
		type: "unknown"
		authorization?: Authorization
		data: Record<string, any>
		batch: Batch
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("unknown"),
			authorization: Authorization.type.optional(),
			data: isly.record(isly.string(), isly.any()),
			batch: Batch.type,
		})
	}
	export function from(creatable: Creatable): Unknown {
		return { ...creatable, status: "failed" }
	}
	export const type = Creatable.type.extend<Unknown>({
		status: isly.string(["succeeded", "failed"]),
		reason: isly.string().optional(),
	})
}
