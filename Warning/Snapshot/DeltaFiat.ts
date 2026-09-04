import { isoly } from "isoly"
import { isly } from "isly"
import { zod } from "../../zod"
import { Base } from "../Base"

export interface DeltaFiat extends Base {
	type: "delta-fiat"
	severity?: "high" | "medium"
	currency: isoly.Currency
}
export namespace DeltaFiat {
	export const type = Base.type.extend<DeltaFiat>({
		type: isly.string("delta-fiat"),
		severity: isly.string(["high", "medium"]).optional(),
		currency: isly.string(),
	})
	export const typeZod: zod.ZodType<DeltaFiat> = Base.typeZod.extend({
		type: zod.literal("delta-fiat"),
		severity: zod.enum(["high", "medium"]).optional(),
		currency: zod.enum(isoly.Currency.values),
	})
}
