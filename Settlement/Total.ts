import { isoly } from "isoly"
import { isly } from "isly"
import { Amount } from "./Amount"

export interface Total {
	expected: Amount
	outcome?: Amount
	collected?: Amount & { transactions: { net: string; fee: string } }
	settled?: Total.Settled
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
		collected: Amount.type
			.extend<Required<Total>["collected"]>({
				transactions: isly.object<Required<Total>["collected"]["transactions"]>({
					net: isly.string(),
					fee: isly.string(),
				}),
			})
			.optional(),
		settled: Settled.optional(),
	})
	export function create(): Total {
		return { expected: { net: 0, fee: { other: 0 } } }
	}
	export function verify(total: Total, type: "outcome" | "collected" | "settled"): boolean {
		let result: boolean
		switch (type) {
			case "outcome":
				result = total.outcome?.net == total.expected.net && total.outcome.fee.other == total.expected.fee.other
				break
			case "collected":
				result = total.collected?.net == total.outcome?.net && total.collected?.fee.other == total.outcome?.fee.other
				break
			case "settled":
				result = total.settled?.net == total.collected?.net
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
				...Amount.add(currency, result.collected ?? { net: 0, fee: { other: 0 } }, addend.collected ?? {}),
				transactions: {
					net: addend.collected?.transactions.net ?? result.collected?.transactions.net ?? "",
					fee: addend.collected?.transactions.fee ?? result.collected?.transactions.fee ?? "",
				},
			}
		if (result.settled || addend.settled)
			result.settled = {
				net: isoly.Currency.add(currency, result.settled?.net ?? 0, addend.settled?.net ?? 0),
				transactions: (result.settled?.transactions ?? []).concat(addend.settled?.transactions ?? []),
			}
		return result
	}
	export function collect(
		currency: isoly.Currency,
		total: Total,
		collected: Amount,
		transactions: { net: string; fee: string }
	): Total {
		const result = { ...total }
		if (result.collected) {
			result.collected.net = isoly.Currency.add(currency, result.collected.net, collected.net)
			result.collected.fee.other = isoly.Currency.add(currency, result.collected.fee.other, collected.fee.other)
		} else
			result.collected = { ...collected, transactions }
		return result
	}
	export function settled(currency: isoly.Currency, total: Total, net: number, transactions: string[]): Total {
		const result = { ...total }
		if (result.settled) {
			result.settled.net = isoly.Currency.add(currency, result.settled.net, net)
			result.settled.transactions.push(...transactions)
		} else
			result.settled = { net, transactions }
		return result
	}
}
