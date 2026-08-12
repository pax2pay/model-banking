import { isly } from "isly"
import { zod } from "../zod"

export interface Fx {
	markup: number
}
export namespace Fx {
	export const type = isly.object<Fx>({ markup: isly.number(value => value >= 0) })
	export const typeZod = zod.object({ markup: zod.number().min(0) })
}
