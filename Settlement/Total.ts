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
		net: number
		fee: {
			other: number
		}
	}
	export const Amount = isly.object<Amount>({
		net: isly.number(),
		fee: isly.object<Amount["fee"]>({ other: isly.number() }),
	})
	export type Settled = {
		net: number
		transactions: string[]
	}
	export const Settled = isly.object<Settled>({ net: isly.number(), transactions: isly.string().array() })
	export const type = isly.object<Total>({
		expected: Amount,
		outcome: Amount.optional(),
		collected: Amount.extend<Required<Total>["collected"]>({
			transactions: isly.object<Required<Total>["collected"]["transactions"]>({
				net: isly.string(),
				fee: isly.string(),
			}),
		}).optional(),
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
	export namespace add {
		export function expected(currency: isoly.Currency, total: Total, expected: Amount): Total {
			return {
				...total,
				expected: {
					net: isoly.Currency.add(currency, total.expected.net, expected.net),
					fee: { other: isoly.Currency.add(currency, total.expected.fee.other, expected.fee.other) },
				},
			}
		}
		export function outcome(currency: isoly.Currency, total: Total, outcome: Amount): Total {
			return {
				...total,
				outcome: {
					net: isoly.Currency.add(currency, total.outcome?.net ?? 0, outcome.net),
					fee: { other: isoly.Currency.add(currency, total.outcome?.fee.other ?? 0, outcome.fee.other) },
				},
			}
		}
		export function collected(
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
}
