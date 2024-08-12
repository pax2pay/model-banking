import { isly } from "isly"
import { Realm } from "../Realm"

export type Stack = typeof Stack.stacks[number]

// realm-scheme-processor(-processor...)
export namespace Stack {
	export const stacks = [
		"test-paxgiro",
		"test-tpl-paxgiro",
		"testUK-marqeta",
		"testUK-tpl-marqeta",
		"testUK-diners-dpg",
		"uk-mc-tpl-marqeta",
	] as const
	export const type = isly.string(stacks)
	export const is = type.is
	export const flaw = type.flaw
	export function toRealm(stack: Stack): Realm {
		return stack.split("-")[0] as Realm
	}
	export function toScheme(stack: Stack): string {
		const scheme = stack.split("-")[1]
		return scheme == "mc" ? "mastercard" : scheme == "diners" ? "diners" : "unknown"
	}
	export function toProcessor(stack: Stack): string {
		return stack
			.split("-")
			.slice(2)
			.map(e => (e == "tpl" ? "transact" : e))
			.join("-")
	}
	export namespace Character {
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
		const table: Record<Stack, Stack.Character> = {
			"test-paxgiro": "z",
			"test-tpl-paxgiro": "y",
			"testUK-marqeta": "x",
			"testUK-tpl-marqeta": "w",
			"testUK-diners-dpg": "u",
			"uk-mc-tpl-marqeta": "a",
		}
		export function from(stack: Stack): Stack.Character {
			return table[stack]
		}
	}
	export type Character = typeof Character.values[number]
}
