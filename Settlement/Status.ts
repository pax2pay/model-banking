import { isly } from "isly"

export type Status = "succeeded" | ["failed", string] | "ongoing"

export namespace Status {
	export const type = isly.union(
		isly.string("succeeded"),
		isly.string("ongoing"),
		isly.tuple(isly.string("failed"), isly.string())
	)
	export const is = type.is
	export const flaw = type.flaw
}
