import { isoly } from "isoly"
import { TraceItem } from "@cloudflare/workers-types"
import { isly } from "isly"
import { Identifier } from "../Identifier"
import { Realm } from "../Realm"
import { Entry as LogEntry } from "./Entry"
import { Locations as LogLocations } from "./Locations"
import { Message as LogMessage } from "./Message"

export interface Log {
	id: Identifier
	realm: Realm
	script?: string
	collection: string
	resource?: string
	entries: Log.Entry[]
	created: isoly.DateTime
}
export namespace Log {
	export import Message = LogMessage
	export import Entry = LogEntry
	export import Locations = LogLocations
	export const type = isly.object<Log>({
		id: Identifier.type,
		realm: Realm.type,
		script: isly.string(),
		collection: isly.string(),
		resource: isly.string().optional(),
		entries: Log.Entry.type.array(),
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
	})
	export function fromEvents(events: TraceItem[]): Log[] {
		const result: Log[] = []
		for (const event of events) {
			const created = event.eventTimestamp
				? isoly.DateTime.create(event.eventTimestamp, "milliseconds")
				: isoly.DateTime.now()
			const message = Log.Message.fromEventLogs(event.logs)
			if (message) {
				const log: Log = {
					id: Identifier.generate(),
					realm: message.realm,
					collection: message.collection,
					entries: message.entries,
					created,
				}
				message.resource && (log.resource = message.resource)
				event.scriptName && (log.script = event.scriptName)
				result.push(log)
			}
		}
		return result
	}
	export function configure(
		collection: string,
		realm: string | undefined,
		resource?: string,
		requireEntries?: boolean,
		locations?: LogLocations
	): void {
		const configuration = { collection, realm, resource, requireEntries }
		if (Log.Message.Configuration.type.is(configuration))
			console.log(configuration)
		if (Log.Locations.type.is(locations))
			console.log(Log.Entry.Message.to("Locations", locations, undefined))
	}
	export function log(message: string, data?: any, resource?: string): void {
		console.log(Log.Entry.Message.to(message, data, resource))
	}
	export function warning(message: string, data?: any, resource?: string): void {
		console.warn(Log.Entry.Message.to(message, data, resource))
	}
	export function exception(message: string, data?: any, resource?: string): void {
		console.error(Log.Entry.Message.to(message, data, resource))
	}
}
