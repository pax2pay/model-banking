import * as isoly from "isoly"
import { Creatable as CardCreatable } from "./Creatable"
import { Meta } from "./Meta"

type Operation = any

export interface Card {
	id: string
	organization: string
	account: string
	iin: string
	expiry: [number, number]
	cardHolderName: string
	created: isoly.DateTime
	limit: [isoly.Currency, number]
	spent: [isoly.Currency, number]
	status: "active" | "cancelled"
	operation: Record<string, Operation>
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
