import { isly } from "isly"
import { zod } from "../zod"

export type Type = (typeof Type.values)[number]
export namespace Type {
	export const values = ["own funds", "emoney"] as const
	export const type = isly.string<Type>(values)
	export const typeZod: zod.ZodType<Type> = zod.enum(values)
}
