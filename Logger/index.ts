import { Log as LoggerLog } from "./Log"
import { LogHandler } from "./LogHandler"

export namespace Logger {
	export import Handler = LogHandler
	export import Log = LoggerLog
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
