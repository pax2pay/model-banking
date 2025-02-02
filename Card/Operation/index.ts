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
	export function fromEntry(entry: Entry): Operation | undefined {
		return entry.type == "unknown"
			? undefined
			: {
					type: "authorization",
					id: (entry.type != "refund" ? entry.authorization?.id : entry.transaction?.id) ?? "unknown",
					status: Operation.fromEntryStatus(entry.type),
					created: isoly.DateTime.now(),
			  }
	}
	export function fromEntryStatus(status: Exclude<Entry.Type, "unknown">): OperationAuthorization.Status {
		const statusConverter: Record<Exclude<Entry.Type, "unknown">, OperationAuthorization.Status> = {
			capture: "captured",
			cancel: "cancelled",
			refund: "refunded",
		}
		return statusConverter[status]
	}
	export const type = isly.union(Card.type, OperationAuthorization.type)
}
