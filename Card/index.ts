import * as isoly from "isoly"
import { Operation } from "../Operation"
import { Creatable as CardCreatable } from "./Creatable"
import { Meta } from "./Meta"
import { Preset } from "./Preset"
export interface Card {
	id: string
	organization: string
	account: string
	iin: string
	preset: Preset
	expiry: [number, number]
	holder: string
	created: isoly.DateTime
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
