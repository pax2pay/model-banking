import { isly } from "isly"
import { isly as isly } from "isly"

export type Scheme = typeof Scheme.schemes[number]
export namespace Scheme {
	export const schemes = ["mastercard", "diners", "visa"] as const
	export const type = isly.string<Scheme>(schemes)
	export const type = isly
		.string<Scheme>("value", ...schemes)
		.rename("Scheme")
		.describe("Card scheme.")
}
