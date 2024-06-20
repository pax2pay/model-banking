import { TraceLog } from "@cloudflare/workers-types"
import type { Log } from "../index"
import { Configuration as MessageConfiguration } from "./Configuration"
import { Entry as MessageEntry } from "./Entry"

export type Message = MessageConfiguration | MessageEntry
export namespace Message {
	export import Configuration = MessageConfiguration
	export import Entry = MessageEntry
	export function fromEventLogs(
		traces: TraceLog[]
	): Pick<Log, "realm" | "collection" | "resource" | "entries"> | undefined {
		const configuration: Pick<Log, "realm" | "collection" | "resource"> | undefined =
			Message.Configuration.fromTraceLog(traces.find(trace => Message.Configuration.type.is(trace.message[0])))
		const result: Pick<Log, "realm" | "collection" | "resource" | "entries"> | undefined = configuration
			? { ...configuration, entries: [] }
			: undefined
		if (result)
			for (const trace of traces) {
				const logFragment: { entry: Log.Entry; resource: Log["resource"] } | undefined =
					Message.Entry.fromEventLogs(trace)
				logFragment?.resource && (result.resource ??= logFragment.resource)
				logFragment?.entry && result.entries.push(logFragment.entry)
			}
		return result
	}
}
