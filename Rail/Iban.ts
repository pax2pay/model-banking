export interface Iban {
	type: "iban"
	iban: string
}
export namespace Iban {
	export const currencies = ["EUR", "GBP", "SEK", "USD"] as const
	// maybe do the Iban checksum check below?
	export function is(value: Iban | any): value is Iban {
		return typeof value == "object" && typeof value.iban == "string" && value.type == "iban"
	}
}
