export const Realms = ["test", "uk", "eu"] as const
export type Realm = typeof Realms[number]

export namespace Realm {
	export function is(value: any | Realm): value is Realm {
		return value && (value == "test" || value == "uk" || value == "eu")
	}

	export function toString(): string {
		let result = ""
		for (const v of Realms) {
			result = result + v + ", "
		}
		return result
	}
}
