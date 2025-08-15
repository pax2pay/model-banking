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
	export type Fiat = SnapshotFiat
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
		export function sum(currency: isoly.Currency, accounts: Record<string, { amount: number }>): number {
			return Object.values(accounts).reduce(
				(result, account) => isoly.Currency.add(currency, result, account.amount),
				0
			)
		}
		export function validate(currency: isoly.Currency, counterbalances: Counterbalance): boolean {
			for (const counterbalance of Object.values(counterbalances))
				if (isoly.Currency.subtract(currency, counterbalance.total, sum(currency, counterbalance.account)))
					return false
			return true
		}
	}
	export function validate(snapshot: Snapshot): boolean {
		const validCounterbalance = Counterbalance.validate(snapshot.currency, snapshot.counterbalance)
		const issuable = snapshot.fiat.total
		const actual = snapshot.emoney.actual ?? 0
		return validCounterbalance && issuable == actual
	}
	export const type = isly.object<Snapshot>({
		warnings: Warning.Snapshot.type.array(),
		emoney: Balance.Extended,
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
