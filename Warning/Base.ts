import { isoly } from "isoly"
import { isly } from "isly"
import { Issue } from "./Issue"

export interface Base {
	type: string
	resource: string
	value?: number
	date: isoly.Date
	issue?: Issue
}

export namespace Base {
	export const type = isly.object<Base>({
		type: isly.string(),
		resource: isly.string(),
		value: isly.number().optional(),
		date: isly.string(),
		issue: Issue.type.optional(),
	})
}
