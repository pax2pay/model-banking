import { isly } from "isly"
import { zod } from "../../zod"

export interface Summary {
	count: number
	failed?: { count: number }
}

export namespace Summary {
	export const type = isly.object<Summary>({
		count: isly.number(),
		failed: isly.object<{ count: number }>({ count: isly.number() }).optional(),
	})
	export const typeZod: zod.ZodType<Summary> = zod.object({
		count: zod.number(),
		failed: zod.object({ count: zod.number() }).optional(),
	})
}
