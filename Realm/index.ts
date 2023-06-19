import { isly } from "isly"

export const Realms = ["test", "testUK", "uk", "eu"] as const
export type Realm = typeof Realms[number]

export namespace Realm {
	export const realms: Realm[] = [...Realms]
	export const type: isly.Type<Realm> = isly.union(
		isly.string("test"),
		isly.string("testUK"),
		isly.string("uk"),
		isly.string("eu")
	)
	export const is = type.is
	export function toString(): string {
		return realms.toString().replaceAll(",", ", ") + "."
	}
}
