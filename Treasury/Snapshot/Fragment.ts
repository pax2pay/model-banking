import { isoly } from "isoly"
import { isly } from "isly"
import { Balance } from "../../Balance"
import { Account } from "../Account"
import { Warning } from "./Warning"

export interface Fragment {
	warnings: Warning[]
	emoney: Balance.Extended
	counterbalance: Fragment.Counterbalance
	fiat: {
		safe: number
		unsafe: number
		total: number // emoney issuable total amount
		other: number
		buffer: number
		accounts: Account[]
	}
}
export namespace Fragment {
	export type Legacy = Override<Fragment, "counterbalance">
	export type Counterbalance = Record<string, { total: number; account: Record<string, { amount: number }> }>
	export namespace Counterbalance {
		export const type = isly.record<Counterbalance>(
			isly.string(),
			isly.object<Counterbalance[string]>({
				total: isly.number(),
				account: isly.record<Counterbalance[string]["account"]>(
					isly.string(),
					isly.object<Counterbalance[string]["account"][string]>({ amount: isly.number() })
				),
			})
		)
		export function sum(currency: isoly.Currency, accounts: Record<string, { amount: number }>): number {
			return Object.values(accounts).reduce(
				(result, account) => isoly.Currency.add(currency, result, account.amount),
				0
			)
		}
		export function validate(currency: isoly.Currency, counterbalances: Counterbalance): boolean {
			for (const counterbalance of Object.values(counterbalances))
				if (isoly.Currency.subtract(currency, counterbalance.total, sum(currency, counterbalance.account)))
					return false
			return true
		}
	}
	export const type = isly.object<Fragment>({
		warnings: Warning.type.array(),
		emoney: Balance.Extended,
		counterbalance: Counterbalance.type,
		fiat: isly.object({
			safe: isly.number(),
			unsafe: isly.number(),
			total: isly.number(),
			other: isly.number(),
			buffer: isly.number(),
			accounts: Account.type.array(),
		}),
	})
	export function validate(currency: isoly.Currency, fragment: Fragment): boolean {
		const validCounterbalance = Counterbalance.validate(currency, fragment.counterbalance)
		const issuable = fragment.fiat.total
		const actual = fragment.emoney.actual ?? 0
		return validCounterbalance && issuable == actual
	}
}
