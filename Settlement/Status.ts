import { isly } from "isly"

export interface Status {
	collected: Status.Values
	settled: Status.Values
}

export namespace Status {
	export const values = ["pending", "failed", "partial", "done"] as const
	export type Values = typeof values[number]
	export const type = isly.union<Status>(
		isly.string("succeeded"),
		isly.string("ongoing"),
		isly.tuple(isly.string("failed"), isly.string())
	)
	export const is = type.is
	export const flaw = type.flaw
}
