import { isly } from "isly"
import { Card } from "../../../Card"
import { Merchant } from "../../../Merchant"
import { Rail } from "../../../Rail"
import { Transaction } from "../.."
import { Base } from "../Base"

export interface MCC extends Base {
	stacks: MCC.Stack[]
	set: MCC.Set
}

export namespace MCC {
	export type Stack = Card.Stack | "*"
	export namespace Stack {
		export const values = [...Card.Stack.stacks, "*"] as const
		export const type = isly.string(values)
	}

	export interface Set {
		values: Merchant.Category[]
		ranges: Set.Range[]
	}
	export namespace Set {
		export interface Range {
			from: Merchant.Category
			to: Merchant.Category
		}
		export namespace Range {
			export const type = isly.object<Range>({
				from: Merchant.Category.type,
				to: Merchant.Category.type,
			})
		}
		export const type = isly.object<Set>({
			values: Merchant.Category.type.array(),
			ranges: Range.type.array(),
		})
		export function within(set: Set, category: string): boolean {
			return (
				set.values.includes(category as Merchant.Category) ||
				set.ranges.some(r => r.from <= category && r.to >= category)
			)
		}
	}

	export const type = Base.type.extend<MCC>({
		stacks: Stack.type.array(),
		set: Set.type,
	})

	function stackMatch(stacks: Stack[], transaction: Transaction): boolean {
		let result: boolean
		if (stacks.includes("*")) {
			result = true
		} else {
			const stack = transaction.state?.card?.preset ? Card.Preset.presets[transaction.state.card.preset] : undefined
			result = !!stack && stacks.includes(stack)
		}
		return result
	}
	export function match(condition: MCC, transaction: Transaction): boolean {
		const category = Rail.Address.Card.Counterpart.type.is(transaction.counterpart)
			? transaction.counterpart.merchant.category
			: undefined
		return !!category && stackMatch(condition.stacks, transaction) && Set.within(condition.set, category)
	}
}
