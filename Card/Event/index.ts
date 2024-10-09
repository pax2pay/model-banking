import { isoly } from "isoly"
import { isly } from "isly"
import type { Authorization as ModelAuthorization } from "../../Authorization"
import type { Entry } from "../../Settlement/Entry"
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
	export const type = isly.union<Event>(Create.type, Cancel.type, Change.type, Event.Authorization.type, Clearing.type)
	export function fromAuthorization(authorization: ModelAuthorization): Event {
		return {
			type: "authorization",
			id: authorization.id,
			outcome: authorization.status != "approved" ? "rejected" : "created",
			at: authorization.created,
			reason: authorization.status == "approved" ? undefined : authorization.status,
			amount: authorization.amount, // FIXME: we need the total transaction amount on auth
		}
	}
	export function fromEntry(entry: Entry): Event | undefined {
		return entry.type == "unknown" || entry.type == "cancel"
			? undefined
			: {
					type: entry.type,
					at: isoly.DateTime.now(),
					currency: entry.amount[0],
					net: entry.amount[1],
					fee: entry.fee.other[entry.amount[0]] ?? 0,
					total: isoly.Currency.add(entry.amount[0], entry.amount[1], entry.fee.other[entry.amount[0]] ?? 0), // FIXME: this computation should probably be done in entry
					// FIXME:	charge: entry.charge,
			  }
	}
}
