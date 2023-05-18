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
			typeof value.account == "string" &&
			typeof value.holder == "string"
		)
	}
}
