import { isly } from "isly"
import { Balances } from "../../Balances"
import { Counterbalances2 } from "../../Counterbalances2"
import { Account } from "../Account"
import { Warning } from "./Warning"

export interface Fragment {
	warnings: Warning[]
	emoney: Balances.Balance & Counterbalances2
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
		emoney: Balances.Balance.type,
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
