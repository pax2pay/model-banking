import { isly } from "isly"
import { zod } from "../zod"

export type Category = string

export namespace Category {
	export const type = isly.fromIs<Category>(
		"Merchant.Category",
		(value: any): value is Category => typeof value === "string" && /^\d{4}$/.test(value)
	)
	export const typeZod = zod.string().regex(/^\d{4}$/)
}
