import { isoly } from "isoly"
import { isly } from "isly"

const year = [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40] as const
type Year = typeof year[number]

const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
type Month = typeof month[number]

export type Expiry = [Year, Month]
export namespace Expiry {
	export const type = isly.tuple<Expiry>(isly.number([...year]), isly.number([...month])) // Deconstructing to remove readonly.
	export const is = type.is
	export function toDateTime(expiry: Expiry): isoly.DateTime {
		const month = expiry[1].toString().length == 2 ? `${expiry[1]}` : `0${expiry[1]}`
		return isoly.DateTime.nextMonth(`20${expiry[0]}-${month}-01T00:00:01.000Z`)
	}
}
