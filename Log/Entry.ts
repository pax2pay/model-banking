import * as z from "zod"

export namespace Entry {
	export const type = z.object({
		message: z.string(),
		data: z.any().optional(),
	})
	export namespace Message {
		export const type = z.object({ ...Entry.type.shape, resource: z.string().optional() })
		export function to(message: string, data: any | undefined, resource: string | undefined): Entry.Message {
			const result: Entry.Message = { message }
			resource && (result.resource = resource)
			data && (result.data = data)
			return result
		}
	}
	export type Message = z.infer<typeof Message.type>
}
export type Entry = z.infer<typeof Entry.type>
