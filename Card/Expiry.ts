import { isoly } from "isoly"
import { isly } from "isly"
import { isly as isly2 } from "isly2"

const year = [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40] as const
type Year = typeof year[number]

const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
type Month = typeof month[number]

export type Expiry = [Year, Month]
export namespace Expiry {
	export const type = isly.tuple<Expiry>(isly.number([...year]), isly.number([...month])) // Deconstructing to remove readonly.
	export const type2 = isly2
		.tuple<Expiry>(
			isly2
				.number("value", ...year)
				.rename("Year")
				.describe("Year of expiry."),
			isly2
				.number("value", ...month)
				.rename("Month")
				.describe("Month of expiry.")
		)
		.rename("Expiry")
		.describe("The year and month the card is valid ([yy, mm]).")
	export function toDateTime(expiry: Expiry): isoly.DateTime {
		return isoly.DateTime.nextMonth(
			"20" + expiry[0].toString() + "-" + expiry[1].toString().padStart(2, "0") + "-01T00:00:01.000Z"
		)
	}
	export function isExpired(expiry: Expiry): boolean {
		const now = isoly.DateTime.now()
		const expiryYear = 2000 + expiry[0]
		return (
			expiryYear < isoly.DateTime.getYear(now) ||
			(expiryYear == isoly.DateTime.getYear(now) && expiry[1] < isoly.DateTime.getMonth(now))
		)
	}
}
