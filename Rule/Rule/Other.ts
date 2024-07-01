import { isly } from "isly"
import { Base } from "./Base"

export interface Other extends Base {
	action: Other.Action
}
export namespace Other {
	export type Action = typeof Action.values[number]
	export namespace Action {
		export const values = ["review", "reject", "flag"] as const
		export const type = isly.string<Action>(values)
	}
	export const type = Base.type.extend<Other>({ action: Action.type })
}
