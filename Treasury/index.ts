import { isoly } from "isoly"
import { Account as TreasuryAccount } from "./Account"
import { Balance as TreasuryBalance } from "./Balance"
import { Fiat as TreasuryFiat } from "./Fiat"
import { Transaction as TreasuryTransaction } from "./Transaction"

export { Treasury } from "./Treasury"
export namespace Treasury {
	export function key(hour?: isoly.DateTime): isoly.DateTime {
		const now = isoly.DateTime.now()
		const latest = isoly.DateTime.getMinute(now) > 15 ? now : isoly.DateTime.previousHour(now)
		return isoly.DateTime.truncate(
			isoly.DateTime.invert(hour && isoly.DateTime.epoch(latest) > isoly.DateTime.epoch(hour) ? hour : latest),
			"hours"
		)
	}
	export type Account = TreasuryAccount
	export type Transaction = TreasuryTransaction
	export type Balance = TreasuryBalance
	export type Fiat = TreasuryFiat
	export const Balance = TreasuryBalance
	export namespace Account {
		export type Creatable = TreasuryAccount.Creatable
		export const Creatable = TreasuryAccount.Creatable
		export type Storable = TreasuryAccount.Storable
		export const Storable = TreasuryAccount.Storable
		export type Fetchable = TreasuryAccount.Fetchable
		export const Fetchable = TreasuryAccount.Fetchable
		export type Conditions = TreasuryAccount.Conditions
		export const Conditions = TreasuryAccount.Conditions
		export type Category = TreasuryAccount.Category
		export const Category = TreasuryAccount.Category
		export const is = TreasuryAccount.is
	}
}
