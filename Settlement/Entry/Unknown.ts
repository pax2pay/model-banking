import { isly } from "isly"

export interface Unknown {
	type: "unknown"
	data: Record<string, any>
}

export namespace Unknown {
	export const type = isly.object<Unknown>({
		type: isly.string("unknown"),
		data: isly.record(isly.string(), isly.any()),
	})
	export const is = type.is
	export const flaw = type.flaw
	export type Creatable = Unknown
	export namespace Creatable {
		export const type = Unknown.type
	}
}
