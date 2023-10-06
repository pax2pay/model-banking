import type { Account as ModelAccount } from "../../Account"

export interface Account extends ModelAccount {
	transactions: { today: { volume: number; spent: number }; card: { today: { volume: number; spent: number } } }
}

export namespace Account {
	export function from(
		account: ModelAccount,
		transactions: { today: { volume: number; spent: number }; card: { today: { volume: number; spent: number } } },
	): Account {
		return { ...account, transactions }
	}
}
