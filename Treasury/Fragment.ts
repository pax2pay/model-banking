import { Balances } from "../Balances"
export interface Overdraft {
	type: "overdraft"
	account: string
	balance: Balances.Balance
}
export type Warning = Overdraft
export interface Fragment {
	warnings: Warning[]
	emoney: Balances.Balance
	fiat: {
		safe: number
		unsafe: number
		total: number // emoney issuable total amount
		other: number
		buffer: number
	}
}
