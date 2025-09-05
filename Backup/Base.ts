import { isoly } from "isoly"
import { Realm } from "../Realm"

export type Base<T> = {
	realm?: Realm
	organization?: string
	account?: string
	entity: string
	entityType: string
	action: Base.Action
	created: isoly.DateTime
	isError?: true
	meta?: any
	value: T
}
export namespace Base {
	export type Action = typeof Action.values[number]
	export namespace Action {
		export const values = ["created", "updated", "cancelled", "removed", "inactivated"] as const
	}
	export type Data = { realm?: Realm; organization?: string; account?: string; isError?: true; meta?: any }
	export type Create<T, B extends Base<T>, D extends Data = Record<string, never>> = (...args: [T, Action, D?]) => B
	export function pipeToSender<T, B extends Base<T>, D extends Data = Record<string, never>>(
		mapper: Base.Create<T, B, D>
	): (sender: (backup: B) => any | Promise<any>) => (...args: Parameters<typeof mapper>) => ReturnType<typeof sender> {
		return sender =>
			(...args) => {
				const backup = mapper(...args)
				return sender(backup)
			}
	}
}
