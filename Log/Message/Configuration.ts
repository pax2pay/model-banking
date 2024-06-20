import { TraceLog } from "@cloudflare/workers-types"
import { isly } from "isly"
import { Realm } from "../../Realm"
import type { Log } from "../index"

export interface Configuration {
	realm: Realm
	collection: string
	resource?: string
}
export namespace Configuration {
	export const type = isly.object<Configuration>({
		realm: Realm.type,
		collection: isly.string(),
		resource: isly.string().optional(),
	})
	export function fromTraceLog(
		trace: TraceLog | undefined
	): Pick<Log, "realm" | "collection" | "resource"> | undefined {
		return trace && Configuration.type.is(trace.message[0])
			? {
					realm: trace.message[0].realm,
					collection: trace.message[0].collection,
					resource: trace.message[0].resource,
			  }
			: undefined
	}
}
