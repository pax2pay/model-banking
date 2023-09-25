import { isly } from "isly"
import { Status } from "./Status"

export interface ChangeType<T = ChangeType.Operand> {
	type: T
	amount: number
	status: Status
	result?: number
}

export namespace ChangeType {
	export const operand = ["add", "subtract"] as const
	export type Operand = typeof operand[number]
	export const type = isly.object<ChangeType>({
		type: isly.string(["add", "subtract"]),
		amount: isly.number(),
		status: Status.type,
		result: isly.number().optional(),
	})
	export const is = type.is
	export namespace Add {
		export const type = ChangeType.type.extend<ChangeType<"add">>({
			type: isly.string("add"),
		})
		export const is = type.is
	}
	export namespace Subtract {
		export const type = ChangeType.type.extend<ChangeType<"subtract">>({
			type: isly.string("subtract"),
		})
		export const is = type.is
	}
}
