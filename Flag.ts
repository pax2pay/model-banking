import { isly } from "isly"

export interface Flag {
	name: string
	color: string
	description: string
}
export const Flag = isly.object<Flag>({ name: isly.string(), color: isly.string(), description: isly.string() })
