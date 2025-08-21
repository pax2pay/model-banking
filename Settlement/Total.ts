import { isoly } from "isoly"
import { isly } from "isly"
import { Supplier } from "../Supplier"
import { Amount } from "./Amount"

export interface Total {
	expected: Amount
	outcome?: Partial<Record<Supplier, Amount>>
	collected?: Partial<Record<Supplier, { transactions: { net: string; fee?: string; charge: string } }>>
	settled?: Partial<Record<Supplier, Total.Settled>>
}
export namespace Total {
	export type Settled = {
		net: number
		transactions: string[]
	}
	export const Settled = isly.object<Settled>({ net: isly.number(), transactions: isly.string().array() })
	export const type = isly.object<Total>({
		expected: Amount.type,
		outcome: Amount.type.optional(),
		collected: isly
			.object<Required<Total>["collected"]>({
				transactions: isly.object<Required<Total>["collected"]["transactions"]>({
					net: isly.string(),
					fee: isly.string().optional(),
					charge: isly.string(),
				}),
			})
			.optional(),
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
				transactions: {
					net: addend.collected?.transactions.net ?? result.collected?.transactions.net ?? "",
					charge: addend.collected?.transactions.charge ?? result.collected?.transactions.charge ?? "",
				},
			}
		if (result.settled || addend.settled)
			result.settled = {
				net: addend.settled?.net ?? result.settled?.net ?? 0,
				transactions: result.settled?.transactions ?? addend.settled?.transactions ?? [],
			}
		return result
	}
}
