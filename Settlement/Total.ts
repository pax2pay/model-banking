import { isoly } from "isoly"
import { isly } from "isly"

export interface Total {
	expected: Total.Amount
	outcome?: Total.Amount
	collected?: Total.Amount & { transactions: { net: string; fee: string } }
	settled?: Total.Settled
}
export namespace Total {
	export type Amount = {
		fee: {
			other: number
		}
		net: number
	}
	export type Settled = {
		amount: number
		transactions: string[]
	}

	export const type = isly.object<Total>({
		expected: isly.object<Total["expected"]>({
			fee: isly.object<Total["expected"]["fee"]>({ other: isly.number() }),
			net: isly.number(),
		}),
		outcome: isly
			.object<Required<Total>["outcome"]>({
				fee: isly.object<Required<Total>["outcome"]["fee"]>({ other: isly.number() }),
				net: isly.number(),
			})
			.optional(),
		collected: isly
			.object<Required<Total>["collected"]>({
				fee: isly.object<Required<Total>["collected"]["fee"]>({
					amount: isly.object<Required<Total>["collected"]["fee"]["amount"]>({ other: isly.number() }),
					transaction: isly.string(),
				}),
				net: isly.object<Required<Total>["collected"]["net"]>({ amount: isly.number(), transaction: isly.string() }),
			})
			.optional(),
		settled: isly
			.object<Required<Total>["settled"]>({ amount: isly.number(), transactions: isly.string().array() })
			.optional(),
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
				result =
					total.collected?.net.amount == total.outcome?.net &&
					total.collected?.fee.amount.other == total.outcome?.fee.other
				break
			case "settled":
				result = total.settled?.amount == total.collected?.net
				break
		}
		return result
	}
	export namespace add {
		export function expected(currency: isoly.Currency, total: Total, expected: Total["expected"]): Total {
			return {
				...total,
				expected: {
					net: isoly.Currency.add(currency, total.expected.net, expected.net),
					fee: { other: isoly.Currency.add(currency, total.expected.fee.other, expected.fee.other) },
				},
			}
		}
		export function outcome(currency: isoly.Currency, total: Total, outcome: Required<Total>["outcome"]): Total {
			return {
				...total,
				outcome: {
					net: isoly.Currency.add(currency, total.outcome?.net ?? 0, outcome.net),
					fee: { other: isoly.Currency.add(currency, total.outcome?.fee.other ?? 0, outcome.fee.other) },
				},
			}
		}
		export function collected(currency: isoly.Currency, total: Total, collected: Required<Total>["collected"]): Total {
			const result = { ...total }
			if (result.collected) {
				result.collected.net.amount = isoly.Currency.add(currency, result.collected.net.amount, collected.net.amount)
				result.collected.fee.amount.other = isoly.Currency.add(
					currency,
					result.collected.fee.amount.other,
					collected.fee.amount.other
				)
			} else
				result.collected = { ...collected }
			return result
		}
		export function settled(currency: isoly.Currency, total: Total, settled: Required<Total>["settled"]): Total {
			const result = { ...total }
			if (result.settled) {
				result.settled.amount = isoly.Currency.add(currency, result.settled.amount, settled.amount)
				result.settled.transactions.push(...settled.transactions)
			} else
				result.settled = { ...settled }
			return result
		}
	}
}
