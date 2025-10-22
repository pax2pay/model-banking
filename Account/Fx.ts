import { isly } from "isly"

export interface Fx {
	markup: number
}
export namespace Fx {
	export const type = isly.object<Fx>({ markup: isly.number() })
}
