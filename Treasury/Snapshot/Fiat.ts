import { isoly } from "isoly"
import { Supplier } from "../../Supplier"
import { zod } from "../../zod"
import { Balance } from "../Balance"

export interface Fiat {
	supplier: Supplier
	account: string
	timestamp: isoly.DateTime
	type: "safeguarded" | "unsafe" | "other" | "buffer"
	balances: Balance
	conditions?: { minimum?: Balance }
	label?: string
	reference: string
	description?: string
}
export namespace Fiat {
	export const typeZod: zod.ZodType<Fiat> = zod.object({
		supplier: Supplier.typeZod,
		account: zod.string(),
		timestamp: zod.string(),
		type: zod.enum(["safeguarded", "unsafe", "other", "buffer"]),
		balances: Balance.typeZod,
		conditions: zod.object({ minimum: Balance.typeZod.optional() }).optional(),
		label: zod.string().optional(),
		reference: zod.string(),
		description: zod.string().optional(),
	})
}
