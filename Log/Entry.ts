import { isly } from "isly"

export interface Entry {
	message: string
	data?: any
}
export namespace Entry {
	export type Message = Entry & { resource?: string }
	export const type = isly.object<Entry>({
		message: isly.string(),
		data: isly.any().optional(),
	})
	export namespace Message {
		export const type = Entry.type.extend<Message>({ resource: isly.string().optional() })
		export function to(message: string, data: any | undefined, resource: string | undefined): Entry.Message {
			const result: Entry.Message = { message }
			resource && (result.resource = resource)
			data && (result.data = data)
			return result
		}
	}
}
