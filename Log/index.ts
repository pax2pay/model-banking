import { isoly } from "isoly"
import { TraceItem } from "@cloudflare/workers-types"
import * as z from "zod"
import { Identifier } from "../Identifier"
import { Realm } from "../Realm"
import { Entry as LogEntry } from "./Entry"
import { Locations as LogLocations } from "./Locations"
import { Message as LogMessage } from "./Message"

export namespace Log {
	export import Message = LogMessage
	export import Entry = LogEntry
	export import Locations = LogLocations
	export const type = z.object({
		id: Identifier.zodType,
		realm: Realm.zodType,
		script: z.string().optional(),
		collection: z.string(),
		resource: z.string().optional(),
		entries: Log.Entry.type.array(),
		created: z.iso.datetime({ offset: true }),
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
		if (Log.Message.Configuration.type.safeParse(configuration).success)
			console.log(configuration)
		if (Log.Locations.type.safeParse(locations).success)
			console.log(Log.Entry.Message.to("Locations", locations, resource))
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
export type Log = z.infer<typeof Log.type>
