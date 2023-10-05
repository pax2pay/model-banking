import type { Account as ModelAccount } from "../../Account"
import { Amounts } from "../../Amounts"

export interface Account extends ModelAccount {
	transactionRate: number
	spendingRate: Amounts
}

export namespace Account {
	export function from(account: ModelAccount, transactionRate: number, spendingRate: Amounts): Account {
		return { ...account, transactionRate, spendingRate }
	}
}
