import { isly } from "isly"
import { Status } from "./Status"

export interface Change<T extends Change.Operand = Change.Operand> {
	type: T
	amount: number
	status: Status
	result?: number
}

export namespace Change {
	export const operand = ["add", "subtract"] as const
	export type Operand = typeof operand[number]
	export const type = isly.object<Change>({
		type: isly.string(["add", "subtract"]),
		amount: isly.number(),
		status: Status.type,
		result: isly.number().optional(),
	})
	export const is = type.is
	export const flaw = type.flaw
	export namespace Add {
		export const type = Change.type.extend<Change<"add">>({
			type: isly.string("add"),
		})
		export const is = type.is
		export const flaw = type.flaw
	}
	export namespace Subtract {
		export const type = Change.type.extend<Change<"subtract">>({
			type: isly.string("subtract"),
		})
		export const is = type.is
		export const flaw = type.flaw
	}
}
