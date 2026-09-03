import { isly } from "isly"
import { zod } from "../zod"

export type Batch = string
export namespace Batch {
	export const type = isly.string<Batch>()
	export const typeZod: zod.ZodType<Batch> = zod.string()
}
