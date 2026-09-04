import { isoly } from "isoly"
import { isly } from "isly"
import { zod } from "../../zod"
import { Base } from "../Base"

export interface Overdraft extends Base {
	type: "overdraft"
	severity?: "medium"
	organization: string
	currency: isoly.Currency
}

export namespace Overdraft {
	export const type = Base.type.extend<Overdraft>({
		type: isly.string("overdraft"),
		severity: isly.string("medium").optional(),
		organization: isly.string(),
		currency: isly.fromIs("Currency", isoly.Currency.is),
	})
	export const typeZod: zod.ZodType<Overdraft> = Base.typeZod.extend({
		type: zod.literal("overdraft"),
		severity: zod.literal("medium").optional(),
		organization: zod.string(),
		currency: zod.enum(isoly.Currency.values),
	})
}
