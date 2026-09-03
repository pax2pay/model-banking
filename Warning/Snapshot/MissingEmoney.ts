import { isoly } from "isoly"
import { isly } from "isly"
import { zod } from "../../zod"
import { Base } from "../Base"

export interface MissingEmoney extends Base {
	type: "missing-emoney"
	severity?: "high"
	currency: isoly.Currency
}
export namespace MissingEmoney {
	export const type = Base.type.extend<MissingEmoney>({
		type: isly.string("missing-emoney"),
		severity: isly.string("high").optional(),
		currency: isly.string(),
	})
	export const typeZod: zod.ZodType<MissingEmoney> = Base.typeZod.extend({
		type: zod.literal("missing-emoney"),
		severity: zod.literal("high").optional(),
		currency: zod.enum(isoly.Currency.values),
	})
}
