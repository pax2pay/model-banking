import { isoly } from "isoly"
import { Balance } from "../../Balance"
import { Supplier } from "../../Supplier"
import { Transaction } from "../../Transaction"
import { Warning } from "../../Warning"
import { Account as SnapshotAccount } from "./Account"
import { Check as SnapshotCheck } from "./Check"
import { Emoney as SnapshotEmoney } from "./Emoney"
import { Fiat as SnapshotFiat } from "./Fiat"
import { funding as snapshotFunding } from "./funding"
import { Reconciliation as SnapshotReconciliation } from "./Reconciliation"

export interface Snapshot {
	emoney: Balance.Extended & { total?: number }
	created: isoly.DateTime
	currency: isoly.Currency
	supplier: Supplier
	fiat: {
		total: number // emoney issuable total amount
		accounts: Snapshot.Account[]
	}
	notes: Transaction.Note[]
	checks: Snapshot.Check[]
	result: Snapshot.Check.Result
	warnings?: Warning.Snapshot[]
}
export namespace Snapshot {
	export import funding = snapshotFunding
	export import Check = SnapshotCheck
	export type Reconciliation = SnapshotReconciliation
	export type Emoney = SnapshotEmoney
	export type Fiat = SnapshotFiat
	export import Account = SnapshotAccount
}
