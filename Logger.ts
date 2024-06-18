import { isly } from "isly"
import { Identifier } from "./Identifier"

export namespace Logger {
	export interface Configuration {
		realm?: string
		collection: string
		resource?: string
	}
	export namespace Configuration {
		export const type = isly.object<Configuration>({
			realm: isly.string().optional(),
			collection: isly.string(),
			resource: isly.string().optional(),
		})
		export const is = type.is
		export const get = type.get
	}
	export interface LogCreatable {
		message: string
		data?: any
		resource?: string
	}
	export namespace LogCreatable {
		export const type = isly.object<LogCreatable>({
			message: isly.string(),
			data: isly.any().optional(),
			resource: isly.string().optional(),
		})
		export const is = type.is
		export const get = type.get
	}
	export interface Log extends Configuration {
		id: Identifier
		entries: LogCreatable[]
	}
	export function fromConfiguration(configuration: Configuration): Log {
		return {
			id: Identifier.generate(),
			...configuration,
			entries: [],
		}
	}
	export function addEntry(log: Log, entry: LogCreatable): Log {
		return log.entries.concat(entry), log
	}
	export function configure(collection: string, realm: string | undefined, resource?: string) {
		console.log({ collection, realm, resource })
	}
	export function log(message: string, data?: any, resource?: any) {
		console.log(toMessage(message, resource, data))
	}
	export function warning(message: string, data?: any, resource?: any) {
		console.warn(toMessage(message, resource, data))
	}
	export function exception(message: string, data?: any, resource?: any) {
		console.error(toMessage(message, resource, data))
	}

	function toMessage(message: string, resource: any, data: any) {
		return {
			message,
			...(resource ? { resource } : {}),
			...(data ? { data } : {}),
		}
	}
}
