import { isoly } from "isoly"
import { zod } from "../../../zod"
import { Base } from "./Base"
import { Result } from "./Result"

export interface BankFeedIntegrity extends Base {
	check: "bank feed integrity"
	accounts: {
		code: string
		reference: string
		supplier: string
		opening?: { at: isoly.DateTime; balance: number }
		transaction?: { balance: number }
		closing: { at: isoly.DateTime; balance: number }
		timestamp: string
		result: Result
	}[]
}

export namespace BankFeedIntegrity {
	export const typeZod: zod.ZodType<BankFeedIntegrity> = Base.typeZod.extend({
		check: zod.literal("bank feed integrity"),
		accounts: zod.array(
			zod.object({
				code: zod.string(),
				reference: zod.string(),
				supplier: zod.string(),
				opening: zod.object({ at: zod.string().refine(isoly.DateTime.is), balance: zod.number() }).optional(),
				transaction: zod.object({ balance: zod.number() }).optional(),
				closing: zod.object({ at: zod.string().refine(isoly.DateTime.is), balance: zod.number() }),
				timestamp: zod.string(),
				result: Result.typeZod,
			})
		),
	})
}
