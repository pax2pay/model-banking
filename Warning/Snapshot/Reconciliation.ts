import { isoly } from "isoly"
import { isly } from "isly"
import { zod } from "../../zod"
import { Base } from "../Base"

export interface Reconciliation extends Base {
	type: "reconciliation"
	severity?: "high"
	delta: { account: number; operation: number }
	currency: isoly.Currency
	account: string
}
export namespace Reconciliation {
	export const type = Base.type.extend<Reconciliation>({
		type: isly.string("reconciliation"),
		severity: isly.string(["high"]).optional(),
		currency: isly.string(),
		delta: isly.object({ account: isly.number(), operation: isly.number() }),
		account: isly.string(),
	})
	export const typeZod: zod.ZodType<Reconciliation> = Base.typeZod.extend({
		type: zod.literal("reconciliation"),
		severity: zod.literal("high").optional(),
		currency: zod.enum(isoly.Currency.values),
		delta: zod.object({ account: zod.number(), operation: zod.number() }),
		account: zod.string(),
	})
}
