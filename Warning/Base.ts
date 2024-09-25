import { isly } from "isly"

export interface Base {
	type: string
	resource: string
	value?: number
}

export namespace Base {
	export const type = isly.object<Base>({
		type: isly.string(),
		resource: isly.string(),
		value: isly.number().optional(),
	})
}
