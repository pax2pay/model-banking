import { isly } from "isly"

export interface Status {
	collected: Status.Values
	settled: Status.Values
}

export namespace Status {
	export const values = ["pending", "failed", "partial", "done"] as const
	export type Values = typeof values[number]
	export const type = isly.object<Status>({
		collected: isly.string(values),
		settled: isly.string(values),
	})
	export const is = type.is
	export const flaw = type.flaw
}
