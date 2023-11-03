import { Account } from "../Account"

export interface Fiat {
	safe: number
	unsafe: number
	total: number // emoney issuable total amount
	other: number
	buffer: number
	accounts: Account[]
}
