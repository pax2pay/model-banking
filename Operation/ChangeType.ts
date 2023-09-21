import { isly } from "isly"
import { Status } from "./Status"

export interface ChangeType {
	type: "add" | "subtract"
	amount: number
	status: Status
	result?: number
}

export namespace ChangeType {
	export const type = isly.object<ChangeType>({
		type: isly.string(["add", "subtract"]),
		amount: isly.number(),
		status: Status.type,
		result: isly.number().optional(),
	})
	export const is = type.is
}
