import { isly } from "isly"

const year = [
	2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040,
] as const
type Year = typeof year[number]

const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const
type Month = typeof month[number]

export type Expiry = [Year, Month]
export namespace Expiry {
	export const type = isly.tuple<Expiry>(isly.number([...year]), isly.number([...month])) // Deconstructing to remove readonly.
	export const is = type.is
}
