import { isly } from "isly"
import { Authorization } from "../../Authorization"

export interface Unknown extends Unknown.Creatable {
	status: "succeeded" | "failed"
}

export namespace Unknown {
	export interface Creatable {
		type: "unknown"
		authorization?: Authorization
		data: Record<string, any>
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("unknown"),
			authorization: Authorization.type.optional(),
			data: isly.record(isly.string(), isly.any()),
		})
		export const is = Unknown.is
		export const flaw = Unknown.flaw
	}
	export function from(creatable: Creatable): Unknown {
		return { ...creatable, status: "failed" }
	}
	export const type = Creatable.type.extend<Unknown>({ status: isly.string(["succeeded", "failed"]) })
	export const is = type.is
	export const flaw = type.flaw
}
