import { isly } from "isly"

export type Transform = typeof Transform.values[number]

export namespace Transform {
	export const values = ["string", "stringify", "boolean", "float", "integer", "number", "point"] as const
	export const type = isly.string<Transform>(values)
}
