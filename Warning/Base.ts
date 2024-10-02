import { isoly } from "isoly"
import { isly } from "isly"

export interface Base {
	type: string
	resource: string
	value?: number
	date: isoly.Date
}

export namespace Base {
	export const type = isly.object<Base>({
		type: isly.string(),
		resource: isly.string(),
		value: isly.number().optional(),
		date: isly.string(),
	})
}
