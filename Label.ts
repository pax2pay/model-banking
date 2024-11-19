import { isly } from "isly"

export interface Label {
	name: string
	color: string
	description: string
}
export namespace Label {
	export const type = isly.object<Label>({ name: isly.string(), color: isly.string(), description: isly.string() })
	export type Type = typeof Type.values[number]
	export namespace Type {
		export const values = ["flag", "group"] as const
		export const type = isly.string(values)
	}
}
