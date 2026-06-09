import { Card } from "../../../Card"
import { Rail } from "../../../Rail"
import { Transaction } from "../../index"
import { Base } from "../Base"
import { Set as MCCSet } from "./Set"

// TODO change name and remove Condition - just have MCC-Condition or something like that
export interface MCC extends Base {
	stacks?: MCC.Stack[]
	set: MCC.Set
}
export namespace MCC {
	export import Stack = Card.Stack
	export import Set = MCCSet
	export const type = Base.type.extend<MCC>({
		stacks: Stack.type.array().optional(),
		set: Set.type,
	})
	export function stackMatch(stacks: Card.Stack[] | undefined, preset: Card.Preset | undefined): boolean {
		const stack = preset ? Card.Preset.presets[preset] : undefined
		return !stacks || (!!stack && stacks.includes(stack))
	}

	export function match(condition: MCC, transaction: Transaction): boolean {
		const category = Rail.Address.Card.Counterpart.type.is(transaction.counterpart)
			? transaction.counterpart.merchant.category
			: undefined
		return (
			!!category && stackMatch(condition.stacks, transaction.state?.card?.preset) && Set.within(condition.set, category)
		)
	}
}
