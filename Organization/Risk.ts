import { isly } from "isly"

export type Risk = typeof Risk.values[number]

export namespace Risk {
	export const values = ["low", "medium", "high"] as const
	export const type = isly.string(values)
}
