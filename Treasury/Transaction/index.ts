import { isoly } from "isoly"

export interface Transaction {
	id: string
	reference: string
	counterpart: { type: "fiat"; id: string } | { type: "ledger"; id: string } | { type: "external" }
	created: isoly.DateTime
	currency: isoly.Currency
	amount: number
	balance: number
	description?: string
}
