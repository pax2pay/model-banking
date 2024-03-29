import { isly } from "isly"
import { Realm } from "../Realm"

export type Stack = typeof Stack.stacks[number]

export namespace Stack {
	export const stacks = [
		"test-paxgiro",
		"test-tpl-paxgiro",
		"testUK-marqeta",
		"testUK-tpl-marqeta",
		"uk-mc-tpl-marqeta",
	] as const
	export const type = isly.string(stacks)
	export const is = type.is
	export const flaw = type.flaw
	export function toRealm(stack: Stack): Realm {
		return stack.split("-")[0] as Realm
	}
}
