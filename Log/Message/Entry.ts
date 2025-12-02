import { TraceLog } from "@cloudflare/workers-types"
import { zod } from "zod"
import type { Log } from "../index"

export namespace Entry {
	export const type = zod.object({
		message: zod.string(),
		resource: zod.string().optional(),
		data: zod.any().optional(),
	})
	export function fromEventLogs(trace: TraceLog): { entry: Log.Entry; resource: Log["resource"] } | undefined {
		return Entry.type.safeParse(trace.message[0]).success
			? {
					entry: {
						message: trace.message[0].message,
						data: trace.message[0].data,
					},
					resource: trace.message[0].resource,
			  }
			: undefined
	}
}
export type Entry = zod.infer<typeof Entry.type>
