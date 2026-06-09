import { isly } from "isly"

export type Policy = (typeof Policy.values)[number]

export namespace Policy {
	export const values = ["allow", "block"] as const
	export const type = isly.string(values)
}
