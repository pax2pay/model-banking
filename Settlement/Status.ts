import { isly } from "isly"

export interface Status {
	collected: Status.Values
	settled: Status.Values
}

export namespace Status {
	export const values = ["pending", "failed", "partial", "done"] as const
	export type Values = typeof values[number]
	export const type = isly.object<Status>({
		collected: isly.string("value", ...values),
		settled: isly.string("value", ...values),
	})
}
