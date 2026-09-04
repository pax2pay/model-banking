import { isoly } from "isoly"
import { Balance } from "../../Balance"
import { Supplier } from "../../Supplier"
import { Transaction } from "../../Transaction"
import { Warning } from "../../Warning"
import { zod } from "../../zod"
import { Account as SnapshotAccount } from "./Account"
import { Check as SnapshotCheck } from "./Check"
import { Emoney as SnapshotEmoney } from "./Emoney"
import { Fiat as SnapshotFiat } from "./Fiat"
import { funding as snapshotFunding } from "./funding"
import { Reconciliation as SnapshotReconciliation } from "./Reconciliation"

export interface Snapshot {
	version: typeof Snapshot.version
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
	export const version = 2
	export type EmoneyAccounts = {
		id: string
		organization: string
		opening?: { at: isoly.DateTime; balance: number }
		ledger?: { change: number }
		closing: { at: isoly.DateTime; balance: number }
	}
	export namespace EmoneyAccounts {
		export const typeZod = zod.object({
			id: zod.string(),
			organization: zod.string(),
			opening: zod.object({ at: zod.string().refine(isoly.DateTime.is), balance: zod.number() }).optional(),
			ledger: zod.object({ change: zod.number() }).optional(),
			closing: zod.object({ at: zod.string().refine(isoly.DateTime.is), balance: zod.number() }),
		}) satisfies zod.ZodType<EmoneyAccounts>
	}
	export import funding = snapshotFunding
	export import Check = SnapshotCheck
	export import Reconciliation = SnapshotReconciliation
	export import Emoney = SnapshotEmoney
	export import Fiat = SnapshotFiat
	export import Account = SnapshotAccount
	export const typeZod: zod.ZodType<Snapshot> = zod.object({
		version: zod.literal(version),
		emoney: Balance.Extended.typeZod.extend({
			total: zod.number().optional(),
			accounts: zod.array(EmoneyAccounts.typeZod),
		}),
		created: zod.string().refine(isoly.DateTime.is),
		currency: zod.enum(isoly.Currency.values),
		supplier: Supplier.typeZod,
		fiat: zod.object({
			total: zod.number(),
			accounts: zod.array(Account.typeZod),
		}),
		counterbalance: zod.number().optional(),
		notes: zod.array(Transaction.Note.typeZod),
		checks: zod.array(Check.typeZod),
		result: Check.Result.typeZod,
		warnings: zod.array(Warning.Snapshot.typeZod).optional(),
	})
}
