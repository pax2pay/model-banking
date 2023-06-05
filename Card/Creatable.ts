import * as isoly from "isoly"
import { Meta } from "./Meta"
import { Preset } from "./Preset"
export interface Creatable {
	account: string
	preset: Preset
	iin: string
	expiry: [number, number]
	holder: string
	limit: [isoly.Currency, number]
	rules?: string[]
	meta?: Meta
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return false
	}
}
