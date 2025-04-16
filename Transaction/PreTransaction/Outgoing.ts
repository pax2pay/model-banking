import type { Base } from "./Base"

export interface Outgoing extends Base {
	type: "outgoing"
}
export namespace Outgoing {
	export const dummy = true
}
