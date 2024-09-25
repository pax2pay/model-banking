import { isly } from "isly"

export interface Warning {
	type: string
	entity: string
	value?: number
}

export namespace Warning {
	export const type = isly.object<Warning>({
		type: isly.string(),
		entity: isly.string(),
		value: isly.number().optional(),
	})
}
