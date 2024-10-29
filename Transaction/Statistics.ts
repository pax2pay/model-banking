import { isoly } from "isoly"
import { isly } from "isly"
import { Transaction } from "."

export type Statistics = Record<
	"capture" | "refund",
	{
		domestic: {
			count: number
			amount: number
		}
		intraRegion: {
			count: number
			amount: number
		}
		extraRegion: {
			count: number
			amount: number
		}
	}
>

export namespace Statistics {
	export const type = isly.record<Statistics>(
		isly.string(["capture", "refund"]),
		isly.record(
			isly.string(["domestic", "intraRegion", "extraRegion"]),
			isly.object({
				count: isly.number(),
				amount: isly.number(),
			})
		)
	)
	export function append(
		statistics: Statistics,
		transaction: Transaction,
		domestic: isoly.CountryCode.Alpha2[],
		intraRegion: isoly.CountryCode.Alpha2[]
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
			statistics[state.transaction.kind][region].amount += state.transaction.amount
		}
		return statistics
	}
}
