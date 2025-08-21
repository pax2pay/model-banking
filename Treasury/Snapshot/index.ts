import { isoly } from "isoly"
import { isly } from "isly"
import { Balance } from "../../Balance"
import { Supplier } from "../../Supplier"
import { Warning } from "../../Warning"
import { Account } from "../Account"
import { Emoney as SnapshotEmoney } from "./Emoney"
import { funding as snapshotFunding } from "./funding"

export interface Snapshot {
	warnings: Warning.Snapshot[]
	emoney: Balance & { total?: number }
	currency: isoly.Currency
	supplier: Supplier
	counterbalance: Snapshot.Counterbalance
	fiat: {
		safe: number
		unsafe: number
		total: number // emoney issuable total amount
		other: number
		buffer: number
		accounts: Account[]
	}
}
export namespace Snapshot {
	export import funding = snapshotFunding
	export type Emoney = SnapshotEmoney
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
	}
	export const type = isly.object<Snapshot>({
		warnings: Warning.Snapshot.type.array(),
		emoney: Balance.type.extend({ total: isly.number().optional() }),
		counterbalance: Counterbalance.type,
		currency: isly.fromIs("currency", isoly.Currency.is),
		supplier: Supplier.type,
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
