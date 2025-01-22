import { isoly } from "isoly"
import { isly } from "isly"
import { Rail } from "../Rail"
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
	export type Regional = Record<
		Statistics.Region,
		{
			count: number
			amount: number
		}
	>
	export namespace Regional {
		export const type = isly.record(
			isly.string<Region>(Region.values),
			isly.object({
				count: isly.number(),
				amount: isly.number(),
			})
		)
	}
	export const type = isly.object<Statistics>({
		capture: Regional.type,
		refund: Regional.type,
		cards: isly.string().array(),
		cursor: isly.string().optional(),
	})
	export function append(
		statistics: Statistics,
		transaction: Transaction,
		domestic: isoly.CountryCode.Alpha2[],
		intraRegion: isoly.CountryCode.Alpha2[],
		currency: isoly.Currency
	): Statistics {
		const state = transaction.state
		if (
			state &&
			Rail.Address.Card.type.is(transaction.account) &&
			Rail.Address.Card.Counterpart.type.is(transaction.counterpart) &&
			(state.transaction.kind == "capture" || state.transaction.kind == "refund")
		) {
			const region = domestic.includes(transaction.counterpart.merchant.country)
				? "domestic"
				: intraRegion.includes(transaction.counterpart.merchant.country)
				? "intraRegion"
				: "extraRegion"
			statistics[state.transaction.kind][region].count++
			statistics[state.transaction.kind][region].amount = isoly.Currency.add(
				currency,
				statistics[state.transaction.kind][region].amount,
				state.transaction.amount
			)
			statistics.cards.includes(transaction.account.id) || statistics.cards.push(transaction.account.id)
		}
		return statistics
	}
	export function combine(accumulation: Statistics, incoming: Statistics, currency: isoly.Currency): Statistics {
		const [statistics, cards] = (({ cursor, cards, ...rest }) => [rest, cards])(incoming)
		Object.entries(statistics).forEach(([kind, statistic]: [TransactionType, Statistics[TransactionType]]) =>
			Object.entries(statistic).forEach(
				([region, { count, amount }]: [
					Region,
					{
						count: number
						amount: number
					}
				]) => {
					accumulation[kind][region].count += count
					accumulation[kind][region].amount = isoly.Currency.add(currency, accumulation[kind][region].amount, amount)
				}
			)
		)
		cards.forEach(card => accumulation.cards.includes(card) || accumulation.cards.push(card))
		return accumulation
	}
}
