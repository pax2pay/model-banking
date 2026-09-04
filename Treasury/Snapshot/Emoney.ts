import { isoly } from "isoly"
import { Balances } from "../../Balances"
import { Supplier } from "../../Supplier"
import { zod } from "../../zod"

export interface Emoney {
	organization: string
	account: string
	created?: isoly.DateTime
	supplier?: Supplier
	currencies?: isoly.Currency[]
	timestamp: isoly.DateTime
	balances: Balances
}
export namespace Emoney {
	export const typeZod: zod.ZodType<Emoney> = zod.object({
		organization: zod.string(),
		account: zod.string(),
		created: zod.string().refine(isoly.DateTime.is).optional(),
		supplier: Supplier.typeZod.optional(),
		currencies: zod.array(zod.enum(isoly.Currency.values)).optional(),
		timestamp: zod.string().refine(isoly.DateTime.is),
		balances: Balances.typeZod,
	})
}
