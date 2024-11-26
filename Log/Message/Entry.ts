import { TraceLog } from "@cloudflare/workers-types"
import { isly } from "isly"
import type { Log } from "../index"

export interface Entry {
	message: string
	resource?: string
	data?: any
}
export namespace Entry {
	export const type = isly.object<Entry>({
		message: isly.string(),
		resource: isly.string().optional(),
		data: isly.any().optional(),
	})
	export function fromEventLogs(trace: TraceLog): { entry: Log.Entry; resource: Log["resource"] } | undefined {
		return Entry.type.is(trace.message[0])
			? {
					entry: {
						message: trace.message[0].message,
						data: trace.message[0].data,
					},
					resource: trace.message[0].resource,
			  }
			: undefined
	}
	export function getLocationEntry(request: any): Entry {
		return {
			message: "Locations",
			data: {
				"cf-connecting-ip": request.headers["cf-connecting-ip"],
				"cf-ipcountry": request.headers["cf-ipcountry"],
				datacenter: request.cf.colo,
				country: request.cf.colo,
			},
		}
	}
}
