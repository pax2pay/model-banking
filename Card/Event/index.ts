import { isoly } from "isoly"
import { isly } from "isly"
import { Authorization } from "../../Authorization"
import { Entry } from "../../Settlement/Entry"
import { Authorization as EventAuthorization } from "./Authorization"
import { Card } from "./Cancel"

export type Event = Card | EventAuthorization

export namespace Operation {
	export function fromAuthorization(
		authorization: Authorization,
		status: EventAuthorization.Outcome
	): Event | undefined {
		return {
			type: "authorization",
			id: authorization?.id ?? authorization.transaction?.id ?? "unknown",
			status,
			created: isoly.DateTime.now(),
		}
	}
	export function fromEntry(entry: Entry): Event | undefined {
		return entry.type == "unknown"
			? undefined
			: {
					type: "authorization",
					id: (entry.type != "refund" ? entry.authorization?.id : entry.transaction?.id) ?? "unknown",
					status: Operation.fromEntryStatus(entry.type),
					created: isoly.DateTime.now(),
			  }
	}
	export function fromEntryStatus(status: Exclude<Entry.Type, "unknown">): EventAuthorization.Outcome {
		const statusConverter: Record<Exclude<Entry.Type, "unknown">, EventAuthorization.Outcome> = {
			capture: "captured",
			cancel: "cancelled",
			refund: "refunded",
		}
		return statusConverter[status]
	}
	export const type = isly.union(Card.type, EventAuthorization.type)
	export const is = type.is
}
