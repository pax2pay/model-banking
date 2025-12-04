import { zod } from "../zod"

export namespace Entry {
	export const type = zod.object({
		message: zod.string(),
		data: zod.any().optional(),
	})
	export namespace Message {
		export const type = zod.object({ ...Entry.type.shape, resource: zod.string().optional() })
		export function to(message: string, data: any | undefined, resource: string | undefined): Entry.Message {
			const result: Entry.Message = { message }
			resource && (result.resource = resource)
			data && (result.data = data)
			return result
		}
	}
	export type Message = zod.infer<typeof Message.type>
}
export type Entry = zod.infer<typeof Entry.type>
