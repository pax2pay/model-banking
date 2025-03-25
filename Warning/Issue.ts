import { isoly } from "isoly"
import { isly } from "isly"

export interface Issue {
	link: string
	status: "closed" | "open"
}
export namespace Issue {
	export const type = isly.object<Issue>({
		link: isly.string(),
		status: isly.string("value", ["closed", "open"]),
	})
	export interface Creatable {
		type: string
		currency: isoly.Currency
		resource?: string
		issue: Issue
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			type: isly.string(),
			currency: isoly.Currency.type,
			resource: isly.string().optional(),
			issue: Issue.type,
		})
	}
}
