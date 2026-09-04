import { zod } from "../../../zod"
import { Base } from "./Base"

export interface TransactionMatch extends Base {
	check: "transaction match"
	total: number
	matched: number
	unmatched: string[]
}
export namespace TransactionMatch {
	export const typeZod: zod.ZodType<TransactionMatch> = Base.typeZod.extend({
		check: zod.literal("transaction match"),
		total: zod.number(),
		matched: zod.number(),
		unmatched: zod.array(zod.string()),
	})
}
