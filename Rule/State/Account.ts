import { isoly } from "isoly"
import type { Account as ModelAccount } from "../../Account"

export interface Account extends ModelAccount {
	transactions: Account.Transactions
	last: {
		days30: {
			merchant: { country: isoly.CountryCode.Alpha2[]; category: string[]; name: string[]; currency: isoly.Currency[] }
		}
	}
}
export namespace Account {
	export interface Transactions {
		today: { count: number; amount: number }
		incoming: { today: { count: number; amount: number } }
		outgoing: { today: { count: number; amount: number } }
		card: { today: { count: number; amount: number } }
	}
	export function from(account: ModelAccount, transactions: Transactions): Account {
		// return { ...account, transactions }
	}
}
