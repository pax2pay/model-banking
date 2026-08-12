import { isly } from "isly"
import { zod } from "../../zod"

export interface Name {
	first: string
	last: string
}
export namespace Name {
	export const type = isly.object<Name>({ first: isly.string(), last: isly.string() })
	export const typeZod = zod.object({ first: zod.string(), last: zod.string() })
}
