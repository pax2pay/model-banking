// import { isly } from "isly"

export interface Funding {
	type: "funding"
	code: string
	supplier?: string // account.funder[code].supplier
	reference?: string // account.funder[code].reference
}

export namespace Funding {
	// export const type = isly.object<Iban>({
	// type: isly.string("iban"),
	// iban: isly.string(),
	// holder: isly.string(),
	// institution: isly.string().optional(),
	// transactor: isly.string().optional(),
	// })
	// export const is = type.is
}
