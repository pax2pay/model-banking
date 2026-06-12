import { isly } from "isly"

export type Action = (typeof Action.values)[number]

export namespace Action {
	export const values = ["allow", "block"] as const
	export const type = isly.string(values)
}
