import { isoly } from "isoly"
import { isly } from "isly"
import { zod } from "../zod"
import { Issue } from "./Issue"

export interface Base {
	type: string
	severity?: Base.Severity
	resource: string
	value?: number
	date: isoly.Date
	issue?: Issue
	description?: string
}

export namespace Base {
	export type Severity = (typeof Severity.values)[number]
	export namespace Severity {
		export const values = ["low", "medium", "high"] as const
		export const type = isly.string<Severity>(values)
		export const typeZod: zod.ZodType<Severity> = zod.enum(values)
	}
	export const type = isly.object<Base>({
		type: isly.string(),
		severity: Severity.type.optional(),
		resource: isly.string(),
		value: isly.number().optional(),
		date: isly.string(),
		issue: Issue.type.optional(),
		description: isly.string().optional(),
	})
	export const typeZod = zod.object({
		type: zod.string(),
		severity: Severity.typeZod.optional(),
		resource: zod.string(),
		value: zod.number().optional(),
		date: zod.string(),
		issue: Issue.typeZod.optional(),
		description: zod.string().optional(),
	}) satisfies zod.ZodType<Base>
}
