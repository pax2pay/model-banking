import { Account as ModelAccount } from "../../Account"

export type Account = ModelAccount

export namespace Account {
	export function from(account: ModelAccount): Account {
		return account
	}
	export const type = ModelAccount.type
	export const is = type.is
	export const flaw = type.flaw
}
