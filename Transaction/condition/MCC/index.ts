import { Rail } from "../../../Rail"
import { Transaction } from "../../index"
import { Base } from "../Base"
import { Set as MCCSet } from "./Set"
import { Stack as MCCStack } from "./Stack"

export interface MCC extends Base {
	stacks: MCC.Stack[]
	set: MCC.Set
}

export namespace MCC {
	export import Stack = MCCStack
	export import Set = MCCSet
	export const type = Base.type.extend<MCC>({
		stacks: Stack.type.array(),
		set: Set.type,
	})

	export function match(condition: MCC, transaction: Transaction): boolean {
		const category = Rail.Address.Card.Counterpart.type.is(transaction.counterpart)
			? transaction.counterpart.merchant.category
			: undefined
		return (
			!!category &&
			Stack.match(condition.stacks, transaction.state?.card?.preset) &&
			Set.within(condition.set, category)
		)
	}
}
