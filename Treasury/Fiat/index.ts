import { Account } from "../Account"

export interface Fiat {
	safe: number
	unsafe: number
	other: number
	total: number
	accounts: Account[]
}
