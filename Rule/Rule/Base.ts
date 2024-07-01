import { isly } from "isly"

export interface Base {
	code: string
	name: string
	description: string
	type: Base.Kind
	category: Base.Category
	condition: string
	flags: string[]
	groups?: string[]
}
export namespace Base {
	export const kinds = ["authorization", "outbound", "inbound"] as const
	export type Kind = typeof kinds[number]
	export namespace Kind {
		export const type = isly.string<Kind>(kinds)
	}
	export const categories = ["fincrime", "product", "customer"] as const
	export type Category = typeof categories[number]
	export namespace Category {
		export const type = isly.string<Category>(categories)
	}
	export const type = isly.object<Base>({
		code: isly.string(new RegExp(/^[a-z0-9\-_]+$/)),
		name: isly.string(),
		description: isly.string(),
		type: Kind.type,
		category: Category.type,
		condition: isly.string(),
		flags: isly.string().array(),
		groups: isly.string().array().optional(),
	})
}
