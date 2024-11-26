import { TraceLog } from "@cloudflare/workers-types"
import { isly } from "isly"
import { Realm } from "../../Realm"

export interface Configuration {
	realm: Realm
	collection: string
	resource?: string
	requireEntries?: boolean
	request?: any
}
export namespace Configuration {
	export const type = isly.object<Configuration>({
		realm: Realm.type,
		collection: isly.string(),
		resource: isly.string().optional(),
		requireEntries: isly.boolean().optional(),
		request: isly.any().optional(),
	})
	export function fromTraceLog(trace: TraceLog | undefined): Configuration | undefined {
		return trace && Configuration.type.is(trace.message[0])
			? {
					realm: trace.message[0].realm,
					collection: trace.message[0].collection,
					resource: trace.message[0].resource,
					requireEntries: trace.message[0].requireEntries,
			  }
			: undefined
	}
}
