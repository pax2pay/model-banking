import { isoly } from "isoly"
import { isly } from "isly"
import { Balance } from "../../Balance"
import { Account } from "../Account"
import { Warning } from "./Warning"

export interface Fragment {
	warnings: Warning[]
	emoney: Balance.MaybeLegacy
	minted: Fragment.Coinage.Minted
	burned: Fragment.Coinage.Burned
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
	export namespace Coinage {
		export type LedgerAccount = string
		export type Change = { account: Record<LedgerAccount, number>; amount: number }
		export const change = isly.object<Change>({
			account: isly.record(isly.string(), isly.number()),
			amount: isly.number(),
		})
		type Source = string
		export type Minted = Record<Source, Change>
		export namespace Minted {
			export const type = isly.record<Minted>(isly.string(), Fragment.Coinage.change)
		}
		type Sink = string
		export type Burned = Record<Sink, Change>
		export namespace Burned {
			export const type = isly.record<Burned>(isly.string(), Fragment.Coinage.change)
		}
		export function sum(currency: isoly.Currency, coinage: Burned | Minted): number {
			return Object.values(coinage).reduce((result, change) => isoly.Currency.add(currency, result, change.amount), 0)
		}
	}
	export const type = isly.object<Fragment>({
		warnings: Warning.type.array(),
		emoney: Balance.type,
		minted: Fragment.Coinage.Minted.type,
		burned: Fragment.Coinage.Burned.type,
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
		const issuable = fragment.fiat.total
		const actual = fragment.emoney.actual ?? 0
		return issuable == actual
	}
}
