import { isoly } from "isoly"
import { isly } from "isly"
import { zod } from "../../zod"

export interface Bic {
	type: "bic"
	account: string
	institution: string // BIC, validated against the SWIFT directory by the supplier
	country: isoly.CountryCode.Alpha2 // country of the receiving bank, not of the holder
	holder: string
	transactor?: string
}
export namespace Bic {
	export const currencies = ["USD"] as const
	export const type = isly.object<Bic>({
		type: isly.string("bic"),
		account: isly.string(),
		institution: isly.string(),
		country: isly.string(isoly.CountryCode.Alpha2.values),
		holder: isly.string(),
		transactor: isly.string().optional(),
	})
	export const typeZod = zod.object({
		type: zod.literal("bic"),
		account: zod.string(),
		institution: zod.string(),
		country: zod.enum(isoly.CountryCode.Alpha2.values),
		holder: zod.string(),
		transactor: zod.string().optional(),
	})
}
