import { zod } from "../../../zod"
import { Base as ResultBase } from "./Base"

export interface InternalReconciliation extends ResultBase {
	check: "internal reconciliation"
	counterbalance: number
	emoney: number
	discrepancy: number
}
export namespace InternalReconciliation {
	export const typeZod: zod.ZodType<InternalReconciliation> = ResultBase.typeZod.extend({
		check: zod.literal("internal reconciliation"),
		counterbalance: zod.number(),
		emoney: zod.number(),
		discrepancy: zod.number(),
	})
}
