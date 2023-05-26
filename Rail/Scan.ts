import { Iban } from "./Iban"

//SCAN: Sort Code Account Number
export interface Scan {
	type: "scan"
	sort: string
	account: string
	holder: string
}
export namespace Scan {
	export const currencies = ["GBP"] as const
	export function is(value: Scan | any): value is Scan {
		return (
			value &&
			typeof value == "object" &&
			value.type == "scan" &&
			typeof value.sort == "string" &&
			value.sort.length == 6 &&
			typeof value.account == "string" &&
			value.account.length == 8 &&
			typeof value.holder == "string"
		)
	}
	export function fromIban(iban: Iban): Scan {
		return { type: "scan", sort: iban.iban.substring(8, 14), account: iban.iban.substring(14), holder: iban.holder }
	}
}
