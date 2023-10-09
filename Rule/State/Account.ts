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
	export interface Volume {
		today: { count: number; amount: number }
		incoming: { today: { count: number; amount: number } }
		outgoing: { today: { count: number; amount: number } }
		card: { today: { count: number; amount: number } }
	}
	export function from(account: ModelAccount, transactions: Volume): Account {
		return { ...account, transactions }
	}
}
