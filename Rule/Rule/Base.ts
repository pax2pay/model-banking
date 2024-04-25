import { isly } from "isly"

export interface Base {
	code?: string
	name: string
	description: string
	type: Base.Kind
	category: Base.Category
	condition: string
	flags: string[]
	groups?: string[]
}
export namespace Base {
	export const categories = ["customer", "product", "fincrime"] as const
	export type Category = typeof categories[number]
	export const kinds = ["authorization", "outbound", "inbound"] as const
	export type Kind = typeof kinds[number]
	export const type = isly.object<Base>({
		code: isly.string(new RegExp(/^[a-z0-9\-_]+$/)).optional(),
		name: isly.string(),
		description: isly.string(),
		type: isly.string(kinds),
		condition: isly.string(),
		flags: isly.string().array(),
		groups: isly.string().array().optional(),
	})
}
