import { isoly } from "isoly"
import { isly } from "isly"
import { typedly } from "typedly"
import { Card } from "../Card"
import { Transaction } from "."

export interface Statistics {
	capture: Statistics.Regional
	refund: Statistics.Regional
	cards: string[]
	cursor?: string
}
export namespace Statistics {
	export type TransactionType = typeof TransactionType.values[number]
	export namespace TransactionType {
		export const values = ["capture", "refund"] as const
	}
	export type Region = typeof Region.values[number]
	export namespace Region {
		export const values = ["domestic", "intraRegion", "extraRegion"] as const
	}
	export type Regional = Record<Statistics.Region, { count: number; amount: number }>
	export namespace Regional {
		export const type = isly.record(
			isly.string<Region>(Region.values),
			isly.object({ count: isly.number(), amount: isly.number() })
		)
	}
	export const type = isly.object<Statistics>({
		capture: Regional.type,
		refund: Regional.type,
		cards: isly.string().array(),
		cursor: isly.string().optional(),
	})
	function empty(): Statistics {
		return {
			capture: {
				domestic: { count: 0, amount: 0 },
				intraRegion: { count: 0, amount: 0 },
				extraRegion: { count: 0, amount: 0 },
			},
			refund: {
				domestic: { count: 0, amount: 0 },
				intraRegion: { count: 0, amount: 0 },
				extraRegion: { count: 0, amount: 0 },
			},
			cards: [],
		}
	}
	export function compile(
		transactions: Transaction[],
		scheme: Card.Scheme,
		regions: Record<"domestic" | "intraRegion", isoly.CountryCode.Alpha2[]>
	): Statistics {
		const result: Statistics = empty()
		for (const transaction of transactions)
			if (
				Transaction.CardTransaction.type.is(transaction) &&
				transaction.status == "finalized" &&
				transaction.account.scheme == scheme
			) {
				const region = regions.domestic.includes(transaction.counterpart.merchant.country)
					? "domestic"
					: regions.intraRegion.includes(transaction.counterpart.merchant.country)
					? "intraRegion"
					: "extraRegion"
				const kind = transaction.direction == "outbound" ? "capture" : "refund"
				result[kind][region].count++
				result[kind][region].amount = isoly.Currency.add(
					transaction.currency,
					result[kind][region].amount,
					Math.abs(transaction.amount.original)
				)
				result.cards.includes(transaction.account.id) || result.cards.push(transaction.account.id)
			}
		return result
	}
	export function combine(accumulation: Statistics, incoming: Statistics, currency: isoly.Currency): Statistics {
		const [statistics, cards] = (({ cursor, cards, ...rest }) => [rest, cards])(incoming)
		typedly.Object.entries(statistics).forEach(([kind, statistic]: [TransactionType, Statistics[TransactionType]]) =>
			typedly.Object.entries(statistic).forEach(
				([region, { count, amount }]: [Region, { count: number; amount: number }]) => {
					accumulation[kind][region].count += count
					accumulation[kind][region].amount = isoly.Currency.add(currency, accumulation[kind][region].amount, amount)
				}
			)
		)
		cards.forEach(card => accumulation.cards.includes(card) || accumulation.cards.push(card))
		return accumulation
	}
}
