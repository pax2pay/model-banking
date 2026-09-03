import { isly } from "isly"
import { zod } from "../zod"

export interface Status {
	collected: Status.Values
	settled: Status.Values
}

export namespace Status {
	export const values = ["pending", "failed", "partial", "done"] as const
	export type Values = (typeof values)[number]
	export const type = isly.object<Status>({
		collected: isly.string(values),
		settled: isly.string(values),
	})
	export const typeZod: zod.ZodType<Status> = zod.object({
		collected: zod.enum(values),
		settled: zod.enum(values),
	})
}
