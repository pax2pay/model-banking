import { isly } from "isly"


export type Batch = string
export namespace Batch {
	export const type = isly.string<Batch>(/^20\d\d(?:[0-2]\d\d|3[0-6]\d)0[1-6]$/)
	export const is = type.is
}
