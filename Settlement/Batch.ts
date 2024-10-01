import { isly } from "isly"

export type Batch = string
export namespace Batch {
	export const type = isly.string<Batch>()
	export const is = type.is
}
