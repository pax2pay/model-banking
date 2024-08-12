import { isoly } from "isoly"
import { isly } from "isly"
// 2024
export type Identifier = `${isoly.Date}${string}`

export namespace Identifier {
	export namespace alphabet {
		export const values = [
			"a",
			"b",
			"c",
			"d",
			"e",
			"f",
			"g",
			"h",
			"i",
			"j",
			"k",
			"l",
			"m",
			"n",
			"o",
			"p",
			"q",
			"r",
			"s",
			"t",
			"u",
			"v",
			"w",
			"x",
			"y",
			"z",
		] as const
	}
	export type Character = typeof alphabet.values[number]
	export const type = isly.string()
	export function create(date: isoly.Date, stack: Character, order: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9): Identifier {
		return date.replace(/-/g, "") + stack + order
	}
	export function getDate(identifier: Identifier): isoly.Date | undefined {
		const date = identifier.substring(0, 4) + "-" + identifier.substring(4, 6) + "-" + identifier.substring(6, 8)
		return isoly.Date.is(date) ? date : undefined
	}
}
