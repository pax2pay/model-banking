import { isly } from "isly"
import { Balances } from "../../Balances"
import { Account } from "../Account"
import { Warning } from "./Warning"

export interface Fragment {
	warnings: Warning[]
	emoney: Balances.Balance
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
	}
	export const type = isly.object<Fragment>({
		warnings: Warning.type.array(),
		// there is a problem with isly.intersection, but isly.union works for this case
		emoney: Balances.Balance.type,
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
}
