import { isly } from "isly"
import { Realm } from "../Realm"

export type Stack = (typeof Stack.stacks)[number]

// realm-scheme-processor(-processor...)
export namespace Stack {
	export type Active = (typeof Active.values)[number]
	export namespace Active {
		export const test = ["test-paxgiro", "test-tpl-paxgiro", "test-diners-clowd9"] as const
		export const uk = ["uk-visa-tpl-marqeta", "uk-diners-clowd9"] as const
		export const values = [...test, ...uk] as const
		export const type = isly.string([...test, ...uk])
	}
	export type Decommissioned = (typeof Decommissioned.values)[number]
	export namespace Decommissioned {
		export const uk = ["uk-diners-dpg", "uk-mc-tpl-marqeta"] as const
		export const values = [...uk] as const
		export const type = isly.string(values)
	}
	export const stacks = [...Active.values, ...Decommissioned.values] as const
	export const type = isly.string(stacks)
	export function toRealm(stack: Stack): Realm {
		return stack.split("-")[0] as Realm
	}
	export function toScheme(stack: Stack): string {
		let result: string
		switch (stack.split("-")[1]) {
			case "mc":
				result = "mastercard"
				break
			case "diners":
				result = "diners"
				break
			case "visa":
				result = "visa"
				break
			default:
				result = "unknown"
				break
		}
		return result
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
			"test-diners-clowd9": "x",
			"uk-mc-tpl-marqeta": "a",
			"uk-diners-dpg": "b",
			"uk-visa-tpl-marqeta": "c",
			"uk-diners-clowd9": "d",
		}
		export function from(stack: Stack): Stack.Character {
			return table[stack]
		}
		export function toStack(character: Stack.Character): Stack | undefined {
			return Object.entries(table).find<[Stack, Character]>(
				(value): value is [Stack, Character] => value[1] == character
			)?.[0]
		}
	}
	export type Character = (typeof Character.values)[number]
}
