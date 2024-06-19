import { Identifier } from "../Identifier"
import { Log } from "./Log"

export namespace LogHandler {
	export interface Logs extends Log.Configuration {
		id: Identifier
		entries: Log.Creatable[]
	}
	export function fromConfiguration(configuration: Log.Configuration): Logs {
		return {
			id: Identifier.generate(),
			...configuration,
			entries: [],
		}
	}
	export function addEntry(logs: Logs, entry: Log.Creatable): Logs {
		return logs.entries.concat(entry), logs
	}
}
