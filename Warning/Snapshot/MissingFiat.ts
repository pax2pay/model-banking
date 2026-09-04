import { isoly } from "isoly"
import { isly } from "isly"
import { zod } from "../../zod"
import { Base } from "../Base"

export interface MissingFiat extends Base {
	type: "missing-fiat"
	severity?: "high"
	currency: isoly.Currency
}
export namespace MissingFiat {
	export const type = Base.type.extend<MissingFiat>({
		type: isly.string("missing-fiat"),
		severity: isly.string("high").optional(),
		currency: isly.string(),
	})
	export const typeZod: zod.ZodType<MissingFiat> = Base.typeZod.extend({
		type: zod.literal("missing-fiat"),
		severity: zod.literal("high").optional(),
		currency: zod.enum(isoly.Currency.values),
	})
}
