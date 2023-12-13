import { isly } from "isly"
import { Authorization } from "./Authorization"
import { Card } from "./Card"

export type Operation = Card | Authorization

export namespace Operation {
	export function fromEntryStatus(status: "capture" | "cancel" | "refund"): Authorization.Status {
		const statusConverter: Record<string, Authorization.Status> = {
			capture: "captured",
			cancel: "cancelled",
			refund: "refunded",
		}
		return statusConverter[status]
	}
	export const type = isly.union(Card.type, Authorization.type)
	export const is = type.is
}
