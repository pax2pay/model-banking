import { isly } from "isly"

export type Category = (typeof Category.name)[number]
export namespace Category {
	export const name = ["safeguarded", "unsafe", "buffer", "other"] as const
	export const type = isly.string(name)
}
