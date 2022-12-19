export interface Creatable {
	name: string
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return typeof value == "object" && typeof value.name == "string"
	}
}
