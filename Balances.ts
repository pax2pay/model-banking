import { isoly } from "isoly"
import { isly } from "isly"
import { Amounts } from "./Amounts"
import { Balance as BalancesBalance } from "./Balance"

export type Balances = Partial<Record<isoly.Currency, Balances.Balance.Extended>>

export namespace Balances {
	export import Balance = BalancesBalance
	export const type = isly.record<Balances>(isly.fromIs("isoly.Currency", isoly.Currency.is), Balances.Balance.type)
	export function update(balances: Balances): Balances {
		const result: Balances = {}
		for (const [currency, balance] of Object.entries(balances))
			result[currency as isoly.Currency] = Balance.update(currency as isoly.Currency, balance)
		return result
	}
	export function computeReserved(balances: Balances): Amounts {
		const result: Amounts = {}
		for (const [currency, balance] of Object.entries(balances))
			result[currency as isoly.Currency] = Balance.computeReserved(currency as isoly.Currency, balance)[1]
		return result
	}
	export function computeActual(balances: Balances): Amounts {
		const result: Amounts = {}
		for (const [currency, balance] of Object.entries(balances))
			result[currency as isoly.Currency] = Balance.computeActual(currency as isoly.Currency, balance)[1]
		return result
	}
}
