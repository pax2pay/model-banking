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
		"test-diners-dpg",
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
}
