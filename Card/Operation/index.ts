import { isoly } from "isoly"
import { isly } from "isly"
import { isly as isly2 } from "isly2"
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
	export const type2: isly2.Union<Operation> = isly2
		.union<Operation>(Card.type2, OperationAuthorization.type2)
		.rename("Operation")
		.describe("An operation performed on a card.")
}
