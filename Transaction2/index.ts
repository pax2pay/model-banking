import { isoly } from "isoly"
import { Balance } from "../Balance"
import { Rail } from "../Rail"
import { Exchange as TransactionExchange } from "../Transaction/Exchange"
import { Note as TransactionNote } from "../Transaction/Note"
import { Resolved as TransactionResolved } from "./Resolved"

export interface Transaction2 {
	id: string
	status: "closed" | "review" | "pending" | "rejected" | "cancelled"
	reason?:
		| "insufficient funds"
		| "cancelled card"
		| "card expired"
		| "exceeds limit"
		| "invalid csc"
		| "system failure"
		| "invalid request"
		| "expired"
		| "denied"
	amount: { base: number; charge: number; total: number; exchange?: Transaction2.Exchange }
	currency: isoly.Currency
	created: isoly.DateTime
	updated: isoly.DateTime
	closed?: isoly.DateTime
	account: { id: string; name: string; address: Rail.Address }
	counterpart: { code?: string; address: Rail.Address }
	rail: Rail
	balance: Balance
	by?: string
	flags: { current: string[]; old: string[] }
	description: string
	notes: Transaction2.Note[]
}
export namespace Transaction2 {
	export type Failed = Transaction2 & Required<Pick<Transaction2, "reason">> & { status: "rejected" }
	export type Amount = { base: number; charge: number; total: number; exchange?: Exchange }
	export const types = ["card", "internal", "external", "system"] as const
	export type Type = typeof types[number]
	export const directions = ["incoming", "outgoing"] as const
	export type Direction = typeof directions[number]
	export import Exchange = TransactionExchange
	export import Note = TransactionNote
	export import Resolved = TransactionResolved
}
