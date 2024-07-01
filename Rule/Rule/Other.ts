import { isly } from "isly"
import { Base } from "./Base"

export interface Other extends Base {
	action: Other.Action
}
export namespace Other {
	export const actions = ["review", "reject", "flag"] as const
	export type Action = typeof actions[number]
	export namespace Action {
		export const type = isly.string<Action>(actions)
	}
	export const type = Base.type.extend<Other>({ action: Action.type })
}
