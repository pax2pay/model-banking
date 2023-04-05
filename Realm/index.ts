export const Realms = ["test", "uk", "eu"] as const
export type Realm = typeof Realms[number]

export namespace Realm {
	export const realms: Realm[] = [...Realms]

	export function is(value: any | Realm): value is Realm {
		return value && (value == "test" || value == "uk" || value == "eu")
		//return value && realms.includes(value)
	}
	export function toString(): string {
		return realms.toString().replaceAll(",", ", ") + "."
	}
}
