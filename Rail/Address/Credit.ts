import { isly } from "isly"

export interface Credit {
	type: "credit"
	supplier: string
	reference: string
}

export namespace Credit {
	// export const type = isly.object<Iban>({
	// type: isly.string("iban"),
	// iban: isly.string(),
	// holder: isly.string(),
	// institution: isly.string().optional(),
	// transactor: isly.string().optional(),
	// })
	// export const is = type.is
}
