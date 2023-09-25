import { isly } from "isly"

export type Stack = typeof Stack.stacks[number]

export namespace Stack {
	export const stacks = ["test-paxgiro", "test-tpl-paxgiro", "uk-tpl-marqeta"]
	export const type = isly.string(stacks)
}
