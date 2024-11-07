import { isoly } from "isoly"
import { isly } from "isly"
import { Balance } from "../../Balance"
import { Warning } from "../../Warning"
import { Account } from "../Account"

export interface Fragment {
	warnings: Warning.Snapshot[]
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
	export function validate(currency: isoly.Currency, fragment: Fragment): boolean {
		const validCounterbalance = Counterbalance.validate(currency, fragment.counterbalance)
		const issuable = fragment.fiat.total
		const actual = fragment.emoney.actual ?? 0
		return validCounterbalance && issuable == actual
	}
	export const type = isly.object<Fragment>({
		warnings: Warning.Snapshot.type.array(),
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
	export type Legacy = Omit<Fragment, "counterbalance"> & { minted: Legacy.Coinage; burned: Legacy.Coinage }
	export namespace Legacy {
		export type LedgerAccount = string
		export type Change = { account: Record<LedgerAccount, number>; amount: number }
		export const change = isly.object<Change>({
			account: isly.record(isly.string(), isly.number()),
			amount: isly.number(),
		})
		export type Coinage = Record<string, Change>
		export const type = isly.record<Coinage>(isly.string(), change)
		function mergeAccounts(
			currency: isoly.Currency,
			burned: Record<string, { amount: number }>,
			minted?: Record<string, { amount: number }>
		): Record<string, { amount: number }> {
			const result: Record<string, { amount: number }> = { ...(minted ?? {}) }
			for (const [id, account] of Object.entries(burned))
				result[id] = { amount: isoly.Currency.subtract(currency, result[id]?.amount ?? 0, account.amount) }
			return result
		}
		function accountToNew(account: Record<LedgerAccount, number>): Record<string, { amount: number }> {
			return Object.fromEntries(
				Object.entries(account).map<[string, { amount: number }]>(([id, amount]) => [id, { amount }])
			)
		}
		export function toCounterbalance(currency: isoly.Currency, minted: Coinage, burned: Coinage): Counterbalance {
			const result: Counterbalance = {}
			for (const [code, change] of Object.entries(minted))
				result[code] = { total: change.amount, account: accountToNew(change.account) }
			for (const [code, change] of Object.entries(burned))
				result[code] = {
					total: isoly.Currency.subtract(currency, result[code]?.total ?? 0, change.amount),
					account: mergeAccounts(currency, accountToNew(change.account), result[code]?.account),
				}
			return result
		}
	}
	export function fromLegacy(currency: isoly.Currency, fragment: Fragment | Legacy): Fragment {
		let result: Fragment
		if ("counterbalance" in fragment)
			result = fragment
		else {
			const counterbalance = Legacy.toCounterbalance(currency, fragment.minted, fragment.burned)
			const result: Fragment = { ...fragment, counterbalance }
			"burned" in result && delete result.burned
			"minted" in result && delete result.minted
			return result
		}
		return result
	}
}
