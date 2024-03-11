import { isoly } from "isoly"

export namespace funding {
	export interface Transaction {
		type: "funding" | "settlement"
		id: string
		reference: string
		created: isoly.DateTime
		link: string
		currency: isoly.Currency
		amount: number
		balance: number
	}
	export interface Snapshot {
		created: isoly.DateTime
		balance: number
		currency: number
		transactions: Transaction[]
	}
}
