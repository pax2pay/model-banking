import { isly } from "isly"
import { Entry } from "../../Settlement/Entry"
import { Authorization } from "./Authorization"
import { Card } from "./Card"

export type Operation = Card | Authorization

export namespace Operation {
	export function fromEntryStatus(status: Exclude<Entry.Type, "unknown">): Authorization.Status {
		const statusConverter: Record<Exclude<Entry.Type, "unknown">, Authorization.Status> = {
			capture: "captured",
			cancel: "cancelled",
			refund: "refunded",
		}
		return statusConverter[status]
	}
	export const type = isly.union(Card.type, Authorization.type)
	export const is = type.is
}
