import { isly } from "isly"

export type Batch = string
export namespace Batch {
	export const regexp = new RegExp(/20\d\d(?:[0-2]\d\d|3[0-6]\d)0[1-6]$/)
	export const type = isly.string<Batch>(regexp)
	export const is = type.is
}
