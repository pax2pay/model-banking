import { isly } from "isly"
import { zod } from "../../zod"

export type Action = (typeof Action.values)[number]
export namespace Action {
	export const values = ["allow", "block"] as const
	export const type = isly.string<Action>(values)
	export const typeZod: zod.ZodType<Action> = zod.enum(values)
}
