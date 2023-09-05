import { isly } from "isly"
import { Total } from "./Total"

export interface Creatable {
	expected?: Total
	processor: string
	reference: string
}

export namespace Creatable {
	export const type = isly.object<Creatable>({
		expected: Total.type.optional(),
		processor: isly.string(),
		reference: isly.string(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
