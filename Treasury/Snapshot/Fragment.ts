import { isly } from "isly"
import { Balances } from "../../Balances"
import { Counterbalance2 } from "../../Counterbalance2"
import { Account } from "../Account"
import { Warning } from "./Warning"

export interface Fragment {
	warnings: Warning[]
	emoney: Balances.Balance & Counterbalance2
	links: {
		minted: Record<Counterbalance2.Source, Record<string, { ledger: number; supplier: number }>>
		burned: Record<Counterbalance2.Sink, Record<string, { ledger: number; supplier: number }>>
	}
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
	export const type = isly.object<Fragment>({
		warnings: Warning.type.array(),
		// there is a problem with isly.intersection, but isly.union works for this case
		emoney: isly.union<Fragment["emoney"], Balances.Balance, Counterbalance2>(
			Balances.Balance.type,
			Counterbalance2.type
		),
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
