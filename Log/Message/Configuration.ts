import { TraceLog } from "@cloudflare/workers-types"
import * as z from "zod"
import { Realm } from "../../Realm"

export namespace Configuration {
	export const type = z.object({
		realm: Realm.zodType,
		collection: z.string(),
		resource: z.string().optional(),
		requireEntries: z.boolean().optional(),
	})
	export function fromTraceLog(trace: TraceLog | undefined): Configuration | undefined {
		return trace && Configuration.type.safeParse(trace.message[0]).success
			? {
					realm: trace.message[0].realm,
					collection: trace.message[0].collection,
					resource: trace.message[0].resource,
					requireEntries: trace.message[0].requireEntries,
			  }
			: undefined
	}
}
export type Configuration = z.infer<typeof Configuration.type>
