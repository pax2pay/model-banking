import { isoly } from "isoly"
import { typedly } from "typedly"
import { Card } from "../../../Card"
import { Iin } from "./Iin"
import { NonMonthly } from "./NonMonthly"

export type Cards = Record<
	| "Total Number of Cards"
	| "Total Number of Active Cards"
	| "Total Number of Accounts"
	| "Number of Accounts - International Enabled"
	| "Total Number of Active Accounts",
	Partial<Record<Iin, number>>
>
export namespace Cards {
	export function empty(): Cards {
		return {
			"Number of Accounts - International Enabled": {},
			"Total Number of Accounts": {},
			"Total Number of Active Cards": {},
			"Total Number of Cards": {},
			"Total Number of Active Accounts": {},
		}
	}
	export function report(previous: NonMonthly, cards: Card[], range: { start: isoly.Date; end: isoly.Date }): Cards {
		const result = previous
		for (const iin of Iin.values)
			if (iin !== "totalIdx") {
				// number of customers who have or have had active Visa products, ever
				const iinCards = cards.filter(card => card.details.iin == iin)
				const accounts = new Set(iinCards.map(card => card.account)).size
				accounts > 0 &&
					(result["Number of Accounts - International Enabled"][iin] = result["Total Number of Accounts"][iin] =
						accounts)
				// Total number of cards in range
				const iinCardsWithinRange = iinCards.filter((card, i) => {
					return (
						isoly.DateTime.getDate(card.created) >= range.start && isoly.DateTime.getDate(card.created) <= range.end
					)
				})
				iinCardsWithinRange.length > 0 && (result["Total Number of Cards"][iin] = iinCardsWithinRange.length)
				// Total number of active cards at end of range
				const activeCards = iinCardsWithinRange.filter(
					card =>
						card.history.some(
							history => history.status == "cancelled" && isoly.DateTime.getDate(history.created) > range.end
						) || !card.history.some(history => history.status == "cancelled")
				)
				activeCards.length > 0 && (result["Total Number of Active Cards"][iin] = activeCards.length)
				// Total number of customers who have active Visa card(s) at the end of the quarter
				const accountsWithActive = new Set(activeCards.map(card => card.account)).size
				accountsWithActive > 0 && (result["Total Number of Active Accounts"][iin] = accountsWithActive)
			}
		// All idx iin numbers are summed up to totalIdx
		for (const key of typedly.Object.keys(result))
			if (key !== "Payments Transactions Declined for Insufficient Funds - Number")
				result[key]["totalIdx"] = typedly.Object.entries(result[key]).reduce(
					(r, [iin, value]) => r + (Iin.Idx.type.is(iin) && value ? value : 0),
					0
				)
		return result
	}
}
