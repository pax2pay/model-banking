import { isoly } from "isoly"
import { isly } from "isly"
import { Balance } from "../../Balance"
import { Counterbalance } from "../../Counterbalance"
import { Account } from "../Account"
import { Warning } from "./Warning"

export interface Fragment {
	warnings: Warning[]
	emoney: Balance.Extended
	counterbalance: Record<string, { total: number; account: Record<string, { amount: number }> }>
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
		emoney: isly.object({ balance: Balance.type, counterbalance: Counterbalance.type }),
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
