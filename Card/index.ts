import * as isoly from "isoly"
import { Creatable as CardCreatable } from "./Creatable"
import { Meta } from "./Meta"
import { Operation } from "./Operation"
import { Preset } from "./Preset"

export interface Card {
	id: string
	created: isoly.DateTime
	organization: string
	account: string
	details: {
		iin: string
		last4: string
		expiry: [number, number]
		holder: string
	}
	preset: Preset
	limit: [isoly.Currency, number]
	spent: [isoly.Currency, number]
	status: "active" | "cancelled"
	history: Operation[]
	rules: string[]
	meta?: Meta
}

export namespace Card {
	export function is(value: Card | any): value is Card {
		return false
	}
	export type Creatable = CardCreatable
	export const Creatable = CardCreatable
}
