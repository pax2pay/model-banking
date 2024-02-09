import { Balances } from "../Balances"

export interface Snapshot {
	deficientAccounts: { account: string; balance: Balances.Balance }[]
	emoney: Balances.Balance
	fiat: {
		safe: number
		unsafe: number
		total: number // emoney issuable total amount
		other: number
		buffer: number
	}
}
