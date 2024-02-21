import { cryptly } from "cryptly"
import { isly } from "isly"

export interface Internal {
	type: "internal"
	name?: string
	identifier: cryptly.Identifier
	organization?: string
}
export namespace Internal {
	export const currencies = ["EUR", "GBP", "SEK", "USD"] as const
	export const type = isly.object<Internal>({
		type: isly.string("internal"),
		name: isly.string().optional(),
		identifier: isly.fromIs("Identifier", cryptly.Identifier.is),
		organization: isly.string().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
}
