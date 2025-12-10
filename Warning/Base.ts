import { isoly } from "isoly"
import { isly } from "isly"
import { Issue } from "./Issue"

export interface Base {
	type: string
	severity?: Base.Severity
	resource: string
	value?: number
	date: isoly.Date
	issue?: Issue
}

export namespace Base {
	export type Severity = typeof Severity.values[number]
	export namespace Severity {
		export const values = ["low", "medium", "high"] as const
		export const type = isly.string<Severity>(values)
	}
	export const type = isly.object<Base>({
		type: isly.string(),
		severity: Severity.type.optional(),
		resource: isly.string(),
		value: isly.number().optional(),
		date: isly.string(),
		issue: Issue.type.optional(),
	})
}
