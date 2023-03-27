import { Account } from "../Account"

export interface Fiat {
	safe: number
	unsafe: number
	total: number
	accounts: Account[]
}
