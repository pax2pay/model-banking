import { isly } from "isly"

export type Risk = typeof Risk.values[number]

export namespace Risk {
	export const values = ["low", "medium", "high", "prohibited"] as const
	export const type = isly.string(values)
}
