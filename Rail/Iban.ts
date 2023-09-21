export interface Iban {
	name: "fasterPayment" | "swift" | "yanne"
	type: "iban"
	iban: string
	holder: string
}
export namespace Iban {
	export const currencies = ["EUR", "GBP", "SEK", "USD"] as const
	// maybe do the Iban checksum check below?
	export function is(value: Iban | any): value is Iban {
		return (
			value &&
			typeof value == "object" &&
			value.type == "iban" &&
			typeof value.iban == "string" &&
			typeof value.holder == "string"
		)
	}
}
