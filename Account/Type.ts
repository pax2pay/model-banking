import { isly } from "isly"

export type Type = typeof Type.values[number]
export namespace Type {
	export const values = ["own funds", "emoney"] as const
	export const type = isly.string<Type>(values)
}
