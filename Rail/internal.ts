import * as cryptly from "cryptly"

export interface Internal {
	type: "internal"
	identifier: cryptly.Identifier
}
export namespace Internal {
	export const currencies = ["EUR", "GBP", "SEK", "USD"] as const
	export function is(value: Internal | any): value is Internal {
		return typeof value == "object" && cryptly.Identifier.is(value.identifier, 8) && value.type == "internal"
	}
}
