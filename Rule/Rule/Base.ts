import { isly } from "isly"

export interface Base {
	name: string
	description: string
	type: Base.Kind
	condition: string
	flags: string[]
	groups?: string[]
}
export namespace Base {
	export const kinds = ["authorization", "outbound", "inbound"] as const
	export type Kind = typeof kinds[number]
	export const type = isly.object<Base>({
		name: isly.string(),
		description: isly.string(),
		type: isly.string(kinds),
		condition: isly.string(),
		flags: isly.string().array(),
		groups: isly.string().array().optional(),
	})
}
