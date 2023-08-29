import { isly } from "isly"
import { Authorization } from "../../Authorization"

export interface Unknown {
	status: "succeeded" | "failed"
	type: "unknown"
	authorization?: Authorization
	data: Record<string, any>
}

export namespace Unknown {
	export const type = isly.object<Unknown>({
		status: isly.string(["succeeded", "failed"]),
		type: isly.string("unknown"),
		authorization: Authorization.type.optional(),
		data: isly.record(isly.string(), isly.any()),
	})
	export const is = type.is
	export const flaw = type.flaw
	export type Creatable = Unknown
	export namespace Creatable {
		export const type = Unknown.type
		export const is = Unknown.is
		export const flaw = Unknown.flaw
	}
}
