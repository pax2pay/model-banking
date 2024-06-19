import { isly } from "isly"

export namespace Log {
	export interface Configuration {
		realm?: string
		collection: string
		resource?: string
	}
	export namespace Configuration {
		export const type = isly.object<Configuration>({
			realm: isly.string().optional(),
			collection: isly.string(),
			resource: isly.string().optional(),
		})
		export const is = type.is
		export const get = type.get
	}
	export interface Creatable {
		message: string
		data?: any
		resource?: string
	}
	export namespace Creatable {
		export const type = isly.object<Creatable>({
			message: isly.string(),
			data: isly.any().optional(),
			resource: isly.string().optional(),
		})
		export const is = type.is
		export const get = type.get
	}
}
