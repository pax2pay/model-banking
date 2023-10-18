import { isly } from "isly"

export type Stack = typeof Stack.stacks[number]

export namespace Stack {
	export const stacks = ["test-paxgiro", "test-tpl-paxgiro", "testUK-marqeta", "uk-tpl-marqeta"] as const
	export const type = isly.string(stacks)
	export const is = type.is
	export const flaw = type.flaw
}
