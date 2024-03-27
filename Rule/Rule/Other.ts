import { isly } from "isly"

export interface Other {
	action: Other.Action
}
export namespace Other {
	export const actions = ["review", "reject", "flag"] as const
	export type Action = typeof actions[number]
	export const type = isly.object<Other>({ action: isly.string<Action>(actions) })
}
