import { TraceLog } from "@cloudflare/workers-types"
import * as z from "zod"
import type { Log } from "../index"

export namespace Entry {
	export const type = z.object({
		message: z.string(),
		resource: z.string().optional(),
		data: z.any().optional(),
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
export type Entry = z.infer<typeof Entry.type>
