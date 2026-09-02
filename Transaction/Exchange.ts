import { isly } from "isly"
import { Amount } from "../Amount"
import { zod } from "../zod"

export interface Exchange {
	rate: number
	to?: Amount
	from?: Amount
	quote?: string
}
export namespace Exchange {
	export const type = isly.object<Exchange>({
		rate: isly.number(),
		to: Amount.type.optional(),
		from: Amount.type.optional(),
		quote: isly.string().optional(),
	})
	export const typeZod: zod.ZodType<Exchange> = zod.object({
		rate: zod.number(),
		to: Amount.typeZod.optional(),
		from: Amount.typeZod.optional(),
		quote: zod.string().optional(),
	})
}
