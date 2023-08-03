import type { Account as ModelAccount } from "../../Account"

export type Account = ModelAccount

export namespace Account {
	export function from(account: ModelAccount): Account {
		return account
	}
}
