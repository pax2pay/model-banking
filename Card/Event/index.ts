import { isoly } from "isoly"
import { isly } from "isly"
import { Authorization } from "../../Authorization"
import { Entry } from "../../Settlement/Entry"
import { Authorization as EventAuthorization } from "./Authorization"
import { Cancel as EventCancel } from "./Cancel"
import { Change as EventChange } from "./Change"
import { Clearing as EventClearing } from "./Clearing"
import { Create as EventCreate } from "./Create"

export type Event = Event.Create | Event.Cancel | Event.Change | Event.Authorization | Event.Clearing

export namespace Event {
	export import Create = EventCreate
	export import Cancel = EventCancel
	export import Change = EventChange
	export import Authorization = EventAuthorization
	export import Clearing = EventClearing
	export const type = isly.union<Event>(Create.type, Cancel.type, Change.type, Authorization.type, Clearing.type)
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
					status: Event.fromEntryStatus(entry.type),
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
}
