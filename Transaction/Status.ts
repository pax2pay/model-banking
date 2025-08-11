import { isly } from "isly"

export type Status = Status.Success | [Status.Fail, Status.Reason]
export namespace Status {
	// DEPRECATED: "created"
	export const successes = ["created", "review", "processing", "finalized"] as const // "captured"
	export type Success = typeof successes[number]
	export const Success = isly.string<Success>(successes)
	export const failures = ["rejected", "cancelled"] as const
	export type Fail = typeof failures[number]
	export const Fail = isly.string<Fail>(failures)
	export const reasons = [
		"insufficient funds",
		"cancelled card",
		"card expired",
		"exceeds limit",
		"invalid csc",
		"system failure",
		"invalid request",
		"expired",
		"denied",
		"merchant lock violation",
	] as const
	export type Reason = typeof reasons[number]
	export const Reason = isly.string<Reason>(reasons)
	export const type = isly.union<Status, Success, [Fail, Status.Reason]>(
		Success,
		isly.tuple<[Fail, Status.Reason]>(Fail, Reason)
	)
}
