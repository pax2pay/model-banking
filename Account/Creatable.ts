import { isly } from "isly"

export interface Creatable {
	name: string
}

export namespace Creatable {
	export const type = isly.object<Creatable>({ name: isly.string() })
	export const is = type.is
	export const flaw = type.flaw
}
