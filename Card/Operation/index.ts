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
		return entry.status == "failed"
			? undefined
			: {
					type: "authorization",
					id: entry.transaction.id,
					status: entry.type == "capture" ? "captured" : "refunded",
					created: isoly.DateTime.now(),
			  }
	}
	export const type = isly.union(Card.type, OperationAuthorization.type)
}
