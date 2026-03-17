import { isly } from "isly"
import { Iban } from "./Iban"

//SCAN: Sort Code Account Number
export interface Scan {
	type: "scan"
	sort: string
	account: string
	holder: string
	institution?: string // BIC
}
export namespace Scan {
	export const currencies = ["GBP"] as const
	export function fromIban(iban: Iban): Scan {
		return {
			type: "scan",
			sort: iban.iban.substring(8, 14),
			account: iban.iban.substring(14),
			holder: iban.holder,
			institution: iban.institution,
		}
	}
	export const type = isly.object<Scan>({
		type: isly.string("scan"),
		sort: isly.string(),
		account: isly.string(),
		holder: isly.string(),
		institution: isly.string().optional(),
	})
}
