import * as isoly from "isoly"
import { Creatable as CardCreatable } from "./Creatable"
import { Meta } from "./Meta"
import { Operation } from "./Operation"
import { Preset as CardPreset } from "./Preset"

export interface Card {
	id: string
	created: isoly.DateTime
	organization: string
	account: string
	preset: CardPreset
	reference?: string
	details: {
		iin: string
		last4: string
		expiry: [number, number]
		holder: string
	}
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
	export type Preset = CardPreset
	export const Preset = CardPreset
}
