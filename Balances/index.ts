import { isoly } from "isoly"
import { isly } from "isly"
import { Balance as BalancesBalance } from "./Balance"

export type Balances = Partial<Record<isoly.Currency, Balances.Balance>>

export namespace Balances {
	export const Balance = BalancesBalance
	export type Balance = BalancesBalance
	export namespace Balance {
		export type Entry = BalancesBalance.Entry
	}
	export const type = isly.record<Balances>(isly.fromIs("isoly.Currency", isoly.Currency.is), Balances.Balance.type)
	export const is = type.is
	export const flaw = type.flaw
}
