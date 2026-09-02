import { isly } from "isly"
import { zod } from "../../zod"

export interface Iban {
	type: "iban"
	iban: string
	holder: string
	institution?: string // BIC
	transactor?: string
}
export namespace Iban {
	export const currencies = ["EUR", "GBP", "SEK", "USD"] as const
	// maybe do the Iban checksum check below?
	export const type = isly.object<Iban>({
		type: isly.string("iban"),
		iban: isly.string(),
		holder: isly.string(),
		institution: isly.string().optional(),
		transactor: isly.string().optional(),
	})
	export const typeZod: zod.ZodType<Iban> = zod.object({
		type: zod.literal("iban"),
		iban: zod.string(),
		holder: zod.string(),
		institution: zod.string().optional(),
		transactor: zod.string().optional(),
	})
}
