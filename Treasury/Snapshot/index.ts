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
	version: 1
	emoney: Balance.Extended & { total?: number; accounts: Snapshot.EmoneyAccounts[] }
	created: isoly.DateTime
	currency: isoly.Currency
	supplier: Supplier
	fiat: {
		total: number // emoney issuable total amount
		accounts: Snapshot.Account[]
	}
	counterbalance?: number
	notes: Transaction.Note[]
	checks: Snapshot.Check[]
	result: Snapshot.Check.Result
	warnings?: Warning.Snapshot[]
}
export namespace Snapshot {
	export type EmoneyAccounts = {
		id: string
		organization: string
		opening?: { at: isoly.DateTime; balance: number }
		ledger?: { change: number }
		closing: { at: isoly.DateTime; balance: number }
	}
	export import funding = snapshotFunding
	export import Check = SnapshotCheck
	export type Reconciliation = SnapshotReconciliation
	export type Emoney = SnapshotEmoney
	export type Fiat = SnapshotFiat
	export import Account = SnapshotAccount
}
