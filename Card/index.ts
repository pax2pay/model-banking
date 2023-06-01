import * as isoly from "isoly"
import { Transaction } from "../Transaction"
import { Creatable as CardCreatable } from "./Creatable"

export interface Card {
	id: string
	organization: string
	account: string
	created: isoly.DateTime
	expires: isoly.DateTime
	limits: Partial<Record<isoly.Currency, number>>
	transactions: Record<string, Transaction>
	singleUse?: boolean
	state: "active" | "voided" | "suspended" // What statuses do we need?
	rules: string[]
	spent?: Partial<Record<isoly.Currency, number>> // Do we need this property?
}

export namespace Card {
	export function is(value: Card | any): value is Card {
		return false
	}
	export type Creatable = CardCreatable
	export const Creatable = CardCreatable
}
