import { isoly } from "isoly"
import { isly } from "isly"
import { zod } from "../../zod"
import { Base } from "../Base"

export interface MissingTransaction extends Base {
	type: "missing-transaction"
	severity?: "high"
	currency: isoly.Currency
}
export namespace MissingTransaction {
	export const type = Base.type.extend<MissingTransaction>({
		type: isly.string("missing-transaction"),
		severity: isly.string("high").optional(),
		currency: isly.string(),
	})
	export const typeZod: zod.ZodType<MissingTransaction> = Base.typeZod.extend({
		type: zod.literal("missing-transaction"),
		severity: zod.literal("high").optional(),
		currency: zod.enum(isoly.Currency.values),
	})
}
