import * as isoly from "isoly"
import { Meta } from "./Meta"

export interface Creatable {
	account: string
	iin: string
	expiry: [number, number]
	cardHolderName: string
	limit: [isoly.Currency, number]
	rules?: string[]
	meta?: Meta
}

export namespace Creatable {
	export function is(value: Creatable | any): value is Creatable {
		return false
	}
}
