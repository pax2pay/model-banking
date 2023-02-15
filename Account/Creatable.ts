export interface Creatable {
	name: string
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return typeof value == "object" && typeof value.name == "string"
	}
	export function isPartial(value: Partial<Creatable> | any): value is Partial<Creatable> {
		return (
			value &&
			typeof value == "object" &&
			Object.entries(value).length > 0 &&
			Object.entries(value).every(([k, v]) => k == "name" && typeof v == "string")
		)
	}
}
