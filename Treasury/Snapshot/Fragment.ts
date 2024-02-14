import { isly } from "isly"
import { Balances } from "../../Balances"
import { Warning } from "./Warning"

export interface Fragment {
	warnings: Warning[]
	emoney: Balances.Balance
	fiat: {
		safe: number
		unsafe: number
		total: number // emoney issuable total amount
		other: number
		buffer: number
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
		}),
	})
}
