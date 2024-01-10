import { isly } from "isly"

export type Status = typeof Status.values[number]
export namespace Status {
	export const values = ["created", "approved", "rejected", "processing", "finalized", "cancelled"] as const
	export const type = isly.string(values)
	export const is = type.is
	export const flaw = type.flaw
}
