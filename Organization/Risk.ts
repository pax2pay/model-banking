import { isly } from "isly"
import { zod } from "../zod"

export type Risk = (typeof Risk.values)[number]

export namespace Risk {
	export const values = ["low", "medium", "high", "prohibited"] as const
	export const type = isly.string(values)
	export const typeZod = zod.enum(values)
}
