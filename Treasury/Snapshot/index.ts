import { isoly } from "isoly"
import { isly } from "isly"
import { Balance } from "../../Balance"
import { Supplier } from "../../Supplier"
import { Transaction } from "../../Transaction"
import { Warning } from "../../Warning"
import { Account as SnapshotAccount } from "./Account"
import { Emoney as SnapshotEmoney } from "./Emoney"
import { Fiat as SnapshotFiat } from "./Fiat"
import { funding as snapshotFunding } from "./funding"
import { Reconciliation as SnapshotReconciliation } from "./Reconciliation"

export interface Snapshot {
	warnings: Warning.Snapshot[]
	emoney: Balance.Extended & Snapshot.Reconciliation
	currency: isoly.Currency
	supplier: Supplier
	fiat: {
		safe: number
		unsafe: number
		total: number // emoney issuable total amount
		other: number
		buffer: number
		accounts: Snapshot.Account[]
	}
	notes: Transaction.Note[]
}
export namespace Snapshot {
	export import funding = snapshotFunding
	export type Reconciliation = SnapshotReconciliation
	export type Emoney = SnapshotEmoney
	export type Fiat = SnapshotFiat
	export import Account = SnapshotAccount
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
		notes: Transaction.Note.type.array(),
	})
}
