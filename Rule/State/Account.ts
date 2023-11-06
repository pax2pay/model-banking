import { isoly } from "isoly"
import type { Account as ModelAccount } from "../../Account"

// type Merchant = {
// 	merchant: {
// 		country: isoly.CountryCode.Alpha2[]
// 		category: string[]
// 		name: string[]
// 	}
// }
// export const a1 = "account.daysElapsed.merchant.name<30"
// export const a2 = "account.days.merchant.name<30"
// export const a3 = "account.elapsedDays.merchant.country<30"
// export const a4 = "account.elapsedDays.merchant.category<30"

export interface Account extends ModelAccount {
	transactions: Account.Transactions
	currency: isoly.Currency[]
	days: {
		merchant: {
			name: number
			country: number
			category: number
		}
		currency: number
	}
}
// type Modulus365EpochDays = number
// type Storage = Record<`statistics|currency|${isoly.Currency}`, isoly.DateTime>
export namespace Account {
	type Today = {
		count: number
		amount: number
	}

	export interface Transactions {
		today: Today
		incoming: { today: Today }
		outgoing: { today: Today }
		card: { today: Today }
	}
	export function from(account: ModelAccount, transactions: Transactions): Account {
		// return { ...account, transactions }
	}
}
