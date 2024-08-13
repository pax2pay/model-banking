import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"

//(date without dashed)(stack.Character)(single digit number representing batch)
//20200102a3
export type Identifier = `${isoly.Date}${string}`
export namespace Identifier {
	export const type = isly.string()
	export function create(date: isoly.Date, stack: Card.Stack, order: number): Identifier {
		return date.replace(/-/g, "") + Card.Stack.Character.from(stack) + order
	}
	export function getDate(identifier: Identifier): isoly.Date | undefined {
		const date = identifier.substring(0, 4) + "-" + identifier.substring(4, 6) + "-" + identifier.substring(6, 8)
		return isoly.Date.is(date) ? date : undefined
	}
}
