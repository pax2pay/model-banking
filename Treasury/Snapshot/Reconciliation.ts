import { zod } from "../../zod"

export interface Reconciliation {
	correct: number
	incorrect: number
}
export namespace Reconciliation {
	export const typeZod: zod.ZodType<Reconciliation> = zod.object({
		correct: zod.number(),
		incorrect: zod.number(),
	})
}
