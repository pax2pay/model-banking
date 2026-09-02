import { isly } from "isly"
import { zod } from "../../zod"

export interface Bic {
	type: "bic"
	account: string
	institution: string // BIC, validated against the SWIFT directory by the supplier
	holder: string
	transactor?: string
}
export namespace Bic {
	export const currencies = ["USD"] as const
	export const type = isly.object<Bic>({
		type: isly.string("bic"),
		account: isly.string(),
		institution: isly.string(),
		holder: isly.string(),
		transactor: isly.string().optional(),
	})
	export const typeZod: zod.ZodType<Bic> = zod.object({
		type: zod.literal("bic"),
		account: zod.string(),
		institution: zod.string(),
		holder: zod.string(),
		transactor: zod.string().optional(),
	})
}
