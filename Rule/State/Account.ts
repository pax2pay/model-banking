import type { Account as ModelAccount } from "../../Account"
import { Amounts } from "../../Amounts"

export interface Account extends ModelAccount {
	transactions: { today: number }
	spent: { today: Amounts }
}

export namespace Account {
	export function from(account: ModelAccount, transactions: { today: number }, spent: { today: Amounts }): Account {
		return { ...account, transactions, spent }
	}
}
