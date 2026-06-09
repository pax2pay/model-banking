import { isly } from "isly"
import { Card } from "../../../Card"

export type Stack = Card.Stack | "*"
export namespace Stack {
	export const values = [...Card.Stack.stacks, "*"] as const
	export const type = isly.string(values)

	export function match(stacks: Stack[], preset: Card.Preset | undefined): boolean {
		let result: boolean
		if (stacks.includes("*")) {
			result = true
		} else {
			const stack = preset ? Card.Preset.presets[preset] : undefined
			result = !!stack && stacks.includes(stack)
		}
		return result
	}
}
