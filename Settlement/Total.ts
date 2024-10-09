import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "./Amount"

export interface Total {
	expected: Amount
	outcome?: Amount
	collected?: { transactions: Record<Total.Collection.Type, string> }
	settled?: Total.Settled
}
export namespace Total {
	export namespace Collection {
		export const types = ["net", "fee", "charge"] as const
		export type Type = typeof types[number]
	}
	export type Settled = { net: number; transactions: string[] }
	export const Settled = isly.object<Settled>({ net: isly.number(), transactions: isly.string().array() })
	export const type = isly.object<Total>({
		expected: Amount.type,
		outcome: Amount.type.optional(),
		collected: isly
			.object<Required<Total>["collected"]>({
				transactions: isly.object<Required<Total>["collected"]["transactions"]>({
					net: isly.string(),
					fee: isly.string(),
					charge: isly.string(),
				}),
			})
			.optional(),
		settled: Settled.optional(),
	})
	export function create(): Total {
		return { expected: Amount.create() }
	}
	export function verify(total: Total, type: "outcome" | "collected" | "settled"): boolean {
		let result: boolean
		switch (type) {
			case "outcome":
				result = total.outcome?.net == total.expected.net && total.outcome.fee.other == total.expected.fee.other
				break
			case "collected":
				result = total.collected?.transactions ? !Object.values(total.collected.transactions).some(v => !v) : false
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
			result.outcome = Amount.add(currency, result.outcome ?? Amount.create(), addend.outcome ?? {})
		if (result.collected || addend.collected)
			result.collected = {
				transactions: {
					net: addend.collected?.transactions.net ?? result.collected?.transactions.net ?? "",
					fee: addend.collected?.transactions.fee ?? result.collected?.transactions.fee ?? "",
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
