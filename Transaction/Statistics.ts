import { isoly } from "isoly"
import { isly } from "isly"
import { Transaction } from "."

export interface Statistics {
	capture: Statistics.Regional
	refund: Statistics.Regional
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
		const authorization = state?.authorization
		if (state && authorization && (state.transaction.kind == "capture" || state.transaction.kind == "refund")) {
			const region = domestic.some(country => country == authorization.merchant.country)
				? "domestic"
				: intraRegion.includes(authorization.merchant.country)
				? "intraRegion"
				: "extraRegion"
			statistics[state.transaction.kind][region].count++
			statistics[state.transaction.kind][region].amount = isoly.Currency.add(
				currency,
				statistics[state.transaction.kind][region].amount,
				state.transaction.amount
			)
		}
		return statistics
	}
	export function combine(accumulation: Statistics, incoming: Statistics, currency: isoly.Currency): Statistics {
		Object.entries((({ cursor, ...rest }) => rest)(incoming)).forEach(
			([kind, statistic]: [TransactionType, Statistics[TransactionType]]) =>
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
		return accumulation
	}
}
