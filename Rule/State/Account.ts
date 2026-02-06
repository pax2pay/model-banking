import type { Account as ModelAccount } from "../../Account"
import { Rail } from "../../Rail"

export interface Account extends ModelAccount {
	address: Rail.Address
	transactions?: Account.Transactions
	days?: Account.Days
}
// keep for note so we remember how to store: type Storage = Record<`statistics|currency|${isoly.Currency}`, isoly.DateTime>
export namespace Account {
	type Today = {
		count: number
		amount: number
	}
	export interface Days {
		merchant?: {
			name?: number
			country?: number
			category?: number
		}
		currency?: number
	}
	export interface Transactions {
		today: Today
		incoming: { today: Today }
		outgoing: { today: Today }
		card: { today: Today }
	}
	export function from(account: ModelAccount, address: Rail.Address): Account {
		return { ...account, address }
	}
}
