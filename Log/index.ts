import { Identifier } from "../Identifier"
import { Configuration } from "./Configuration"
import { Entry } from "./Entry"

export interface Log extends Configuration {
	id: Identifier
	entries: Entry[]
}
export namespace Log {
	export function addEntry(logs: Log, entry: Entry): Log {
		return logs.entries.concat(entry), logs
	}
	export function fromConfiguration(configuration: Configuration): Log {
		return {
			id: Identifier.generate(),
			...configuration,
			entries: [],
		}
	}
	export function configure(collection: string, realm: string | undefined, resource?: string): void {
		const configuration = { collection, realm, resource }
		if (Configuration.type.is(configuration))
			console.log(JSON.stringify(configuration))
	}
	export function log(message: string, data?: any, resource?: string): void {
		console.log(JSON.stringify(Entry.Message.to(message, data, resource)))
	}
	export function warning(message: string, data?: any, resource?: string): void {
		console.warn(JSON.stringify(Entry.Message.to(message, data, resource)))
	}
	export function exception(message: string, data?: any, resource?: string): void {
		console.error(JSON.stringify(Entry.Message.to(message, data, resource)))
	}
}
