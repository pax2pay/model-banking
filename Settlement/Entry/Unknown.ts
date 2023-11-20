import { isly } from "isly"

export interface Unknown extends Unknown.Creatable {
	status: "succeeded" | "failed"
}

export namespace Unknown {
	export interface Creatable {
		type: "unknown"
		raw?: Record<string, any>
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string("unknown"),
			raw: isly.record(isly.string(), isly.any()),
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
