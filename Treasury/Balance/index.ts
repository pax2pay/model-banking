import * as isoly from "isoly"

export type Balance = Partial<Record<isoly.Currency, number>>

export type Result = { account: string; balances: Balance }

export namespace Balance {
	export function is(value: Balance | any): value is Balance {
		return (
			value &&
			typeof value == "object" &&
			Object.entries(value).every(([k, v]) => isoly.Currency.is(k) && typeof v == "number")
		)
	}
}
export namespace Result {
	export function is(value: Balance | any): value is Result {
		return value && typeof value == "object" && typeof value.account == "string" && Balance.is(value.balances)
	}
}
