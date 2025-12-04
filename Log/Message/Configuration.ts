import { TraceLog } from "@cloudflare/workers-types"
import { Realm } from "../../Realm"
import { zod } from "../../zod"

export namespace Configuration {
	export const type = zod.object({
		realm: Realm.typeZod,
		collection: zod.string(),
		resource: zod.string().optional(),
		requireEntries: zod.boolean().optional(),
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
export type Configuration = zod.infer<typeof Configuration.type>
