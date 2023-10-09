import type { Account as ModelAccount } from "../../Account"

export interface Account extends ModelAccount {
	transactions: {
		today: { Count: number; amount: number }
		incoming: { today: { Count: number; amount: number } }
		outgoing: { today: { Count: number; amount: number } }
		card: { today: { Count: number; amount: number } }
	}
}

export namespace Account {
	export function from(
		account: ModelAccount,
		transactions: { today: { Count: number; amount: number }; card: { today: { Count: number; amount: number } } }
	): Account {
		return { ...account, transactions }
	}
}
