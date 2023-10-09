import type { Account as ModelAccount } from "../../Account"

export interface Account extends ModelAccount {
	transactions: {
		today: { count: number; amount: number }
		incoming: { today: { count: number; amount: number } }
		outgoing: { today: { count: number; amount: number } }
		card: { today: { count: number; amount: number } }
	}
}

export namespace Account {
	export function from(
		account: ModelAccount,
		transactions: { today: { count: number; amount: number }; card: { today: { count: number; amount: number } } }
	): Account {
		return { ...account, transactions }
	}
}
