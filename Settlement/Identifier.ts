import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"

//(date without dashes)(stack.Character)(single digit number representing batch)
//20200102a3
export type Identifier = `${isoly.Date}${string}`
export namespace Identifier {
	export function getCharacter(identifier: Identifier): Card.Stack.Character {
		return identifier.substring(8, 9) as Card.Stack.Character
	}
	export function getCycle(identifier: Identifier): number {
		return +identifier.substring(9)
	}
	export function toProcessor(identifier: Identifier): Card.Stack | undefined {
		return Card.Stack.Character.toStack(getCharacter(identifier))
	}
	export const type = isly.string()
	export function create(date: isoly.Date, stack: Card.Stack, order: number): Identifier {
		return date.replace(/-/g, "") + Card.Stack.Character.from(stack) + order
	}
	export function getDate(identifier: Identifier): isoly.Date | undefined {
		const date = identifier.substring(0, 4) + "-" + identifier.substring(4, 6) + "-" + identifier.substring(6, 8)
		return isoly.Date.is(date) ? date : undefined
	}
}
