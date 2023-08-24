import { isly } from "isly"

export type Scheme = typeof Scheme.schemes[number]
export namespace Scheme {
	export const schemes = ["mastercard"] as const
	export const type = isly.string(schemes)
}
