import { isoly } from "isoly"
import { isly } from "isly"
import { Balance } from "../../Balance"
import { Supplier } from "../../Supplier"
import { Warning } from "../../Warning"
import { Account } from "../Account"
import { Emoney as SnapshotEmoney } from "./Emoney"
import { Fiat as SnapshotFiat } from "./Fiat"
import { funding as snapshotFunding } from "./funding"

export interface Snapshot {
	warnings: Warning.Snapshot[]
	emoney: Balance.Extended & { total?: number }
	currency: isoly.Currency
	supplier: Supplier
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
	export type Fiat = SnapshotFiat
	export function validate(snapshot: Snapshot): boolean {
		const issuable = snapshot.fiat.total
		const actual = snapshot.emoney.actual ?? 0
		return issuable == actual
	}
	export const type = isly.object<Snapshot>({
		warnings: Warning.Snapshot.type.array(),
		emoney: Balance.Extended,
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
