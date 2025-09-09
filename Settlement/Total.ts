import { isoly } from "isoly"
import { isly } from "isly"
import { Supplier } from "../Supplier"
import { Amount } from "./Amount"

export interface Total {
	expected: Amount
	outcome?: Amount
	collected?: Total.Collected
	settled?: Total.Settled
}
export namespace Total {
	export type Collected = { transactions: Collected.Transaction | Collected.Transaction[] }
	export namespace Collected {
		export type Transaction = { net: string; fee?: string; supplier?: Supplier }
		export namespace Transaction {
			export const type = isly.object<Transaction>({
				net: isly.string(),
				fee: isly.string().optional(),
				supplier: Supplier.type.optional(),
			})
		}
		export const type = isly.object<Collected>({ transactions: isly.union(Transaction.type, Transaction.type.array()) })
	}
	export type Settled = { net: number; transactions: string[]; fee?: string }
	export const Settled = isly.object<Settled>({
		net: isly.number(),
		transactions: isly.string().array(),
		fee: isly.string().optional(),
	})
	export const type = isly.object<Total>({
		expected: Amount.type,
		outcome: Amount.type.optional(),
		collected: Collected.type.optional(),
		settled: Settled.optional(),
	})
	export function create(): Total {
		return { expected: { net: 0, fee: { other: 0 } } }
	}
	export function verify(currency: isoly.Currency, total: Total, type: "outcome" | "settled"): boolean {
		let result: boolean
		switch (type) {
			case "outcome":
				result = Amount.sum(currency, total.outcome) == Amount.sum(currency, total.expected)
				break
			case "settled":
				result = total.settled?.net == total.expected.net
				break
		}
		return result
	}
	export function add(currency: isoly.Currency, addendee: Total, addend: Partial<Total>): Total {
		const result: Total = { ...addendee }
		addend.expected && (result.expected = Amount.add(currency, result.expected, addend.expected))
		if (result.outcome || addend.outcome)
			result.outcome = Amount.add(currency, result.outcome ?? { net: 0, fee: { other: 0 } }, addend.outcome ?? {})
		if (result.collected || addend.collected)
			result.collected = {
				// TODO: FIXME
				transactions: [], //{ net: addend.collected?.transactions.net ?? result.collected?.transactions.net ?? "" },
			}
		if (result.settled || addend.settled)
			result.settled = {
				net: addend.settled?.net ?? result.settled?.net ?? 0,
				transactions: result.settled?.transactions ?? addend.settled?.transactions ?? [],
			}
		return result
	}
}
