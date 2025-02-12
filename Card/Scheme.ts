import { isly } from "isly"

export type Scheme = typeof Scheme.schemes[number]
export namespace Scheme {
	export const schemes = ["mastercard", "diners", "visa"] as const
	export const type = isly.string<Scheme>(schemes)
}
