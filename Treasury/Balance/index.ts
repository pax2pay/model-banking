import { Amounts } from "../../Amounts"

export type Balance = Amounts

export type Result = { account: string; balance: number }

export namespace Balance {
	export const type = Amounts.type
	export const is = Amounts.is
	export const flaw = Amounts.flaw
}
export namespace Result {
	export function is(value: Result | any): value is Result {
		return value && typeof value == "object" && typeof value.account == "string" && typeof value.balance == "number"
	}
}
