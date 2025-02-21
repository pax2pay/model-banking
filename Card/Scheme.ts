import { isly } from "isly"
import { isly as isly2 } from "isly2"

export type Scheme = typeof Scheme.schemes[number]
export namespace Scheme {
	export const schemes = ["mastercard", "diners", "visa"] as const
	export const type = isly.string<Scheme>(schemes)
	export const type2 = isly2
		.string<Scheme>("value", ...schemes)
		.rename("Scheme")
		.describe("Card scheme.")
}
