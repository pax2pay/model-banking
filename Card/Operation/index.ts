import { isoly } from "isoly"
import { isly } from "isly"
import { Authorization } from "../../Authorization"
import { Entry } from "../../Settlement/Entry"
import { Authorization as OperationAuthorization } from "./Authorization"
import { Card } from "./Card"

export type Operation = Card | OperationAuthorization

export namespace Operation {
	export function fromAuthorization(authorization: Authorization, status: OperationAuthorization.Status): Operation {
		return {
			type: "authorization",
			id: authorization?.id ?? authorization.transaction?.id ?? "unknown",
			status,
			created: isoly.DateTime.now(),
		}
	}
	export function fromEntry(entry: Entry | Entry.Failed): Operation | undefined {
		return entry.type == "unknown"
			? undefined
			: {
					type: "authorization",
					id: entry.transaction ?? "unknown",
					status: Operation.fromEntryStatus(entry.type),
					created: isoly.DateTime.now(),
			  }
	}
	export function fromEntryStatus(status: Exclude<Entry["type"], "unknown">): OperationAuthorization.Status {
		const statusConverter: Record<Exclude<Entry["type"], "unknown">, OperationAuthorization.Status> = {
			capture: "captured",
			refund: "refunded",
		}
		return statusConverter[status]
	}
	export const type = isly.union(Card.type, OperationAuthorization.type)
}
