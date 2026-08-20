import { isly } from "isly"
import { zod } from "../zod"

export type Status = (typeof Status.values)[number]

export namespace Status {
	export const values = ["pending", "success", "failed"] as const
	export const type = isly.string(values)
	export const typeZod = zod.enum(values)
}
