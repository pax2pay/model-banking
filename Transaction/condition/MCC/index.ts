import { isly } from "isly"
import { Card } from "../../../Card"
import { Rail } from "../../../Rail"
import { Transaction } from "../.."
import { Base } from "../Base"

export interface MCC extends Base {
	stacks: MCC.Stack[]
	set: MCC.Set
}

export namespace MCC {
	export const type = Base.type.extend<MCC>({
		stacks: Stack.type.array(),
		set: Set.type,
	})

	export type Stack = Card.Stack | "*"
	export namespace Stack {
		export const values = [...Card.Stack.stacks, "*"] as const
		export const type = isly.string(values)
	}
	export interface Set {
		values: Set.Value[]
		ranges: Set.Range[]
	}
	export namespace Set {
		export function within(set: Set, mcc: string): boolean {
			const appliesToValue = set.values.includes(mcc as Value) || set.ranges.some(r => r.from <= mcc && r.to >= mcc)
			return appliesToValue
		}
		export const type = isly.object<Set>({
			values: Value.type.array(),
			ranges: Range.type.array(),
		})
		export type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
		export type Value = `${Digit}${Digit}${Digit}${Digit}`
		export namespace Value {
			export const type = isly.fromIs<Value>("Transaction.Condition.MCC.Set.Value", (s: any): s is Value =>
				/^\d{4}$/.test(s)
			)
		}
		export interface Range {
			from: Value
			to: Value
		}
		export namespace Range {
			export const type = isly.object<Range>({
				from: Value.type,
				to: Value.type,
			})
		}
	}

	function stackMatch(stacks: Stack[], transaction: Transaction): boolean {
		let result: boolean
		if (stacks.includes("*")) {
			result = true
		} else {
			const cardStack = transaction.state?.card?.preset ? Card.Preset.presets[transaction.state.card.preset] : undefined
			result = !!cardStack && !!transaction.state?.card?.preset && stacks.includes(cardStack)
		}
		return result
	}
	export function match(condition: MCC, transaction: Transaction): boolean {
		const mcc = Rail.Address.Card.Counterpart.type.is(transaction.counterpart)
			? transaction.counterpart.merchant.category
			: undefined
		return !!mcc && stackMatch(condition.stacks, transaction) && MCC.Set.within(condition.set, mcc)
	}
}
