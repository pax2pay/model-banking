import { zod } from "../../../zod"
import { Base } from "./Base"

export interface ExternalReconciliation extends Base {
	check: "external reconciliation"
	counterbalance: number
	fiat: number
	discrepancy: number
}
export namespace ExternalReconciliation {
	export const typeZod: zod.ZodType<ExternalReconciliation> = Base.typeZod.extend({
		check: zod.literal("external reconciliation"),
		counterbalance: zod.number(),
		fiat: zod.number(),
		discrepancy: zod.number(),
	})
}
