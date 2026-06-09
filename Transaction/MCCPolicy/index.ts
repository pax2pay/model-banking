import { isly } from "isly"
import { Card } from "../../Card"
import { Rail } from "../../Rail"
import { Transaction } from "../index"
import { Action as MCCAction } from "./Action"
import { Group as MCCGroup } from "./Group"

// TODO change name and remove Condition - just have MCC-Condition or something like that
export interface MCCPolicy {
	id: string
	action: MCCPolicy.Action
	description: string
	organizations?: string[]
	stacks?: Card.Stack[]
	group: MCCPolicy.Group
}
export namespace MCCPolicy {
	export import Action = MCCAction
	export import Group = MCCGroup
	export const type = isly.object<MCCPolicy>({
		id: isly.string(),
		action: Action.type,
		description: isly.string(),
		organizations: isly.string().array().optional(),
		stacks: Card.Stack.type.array().optional(),
		group: Group.type,
	})
	export function stackMatch(stacks: Card.Stack[] | undefined, preset: Card.Preset | undefined): boolean {
		const stack = preset ? Card.Preset.presets[preset] : undefined
		return !stacks || (!!stack && stacks.includes(stack))
	}

	export function match(policy: MCCPolicy, transaction: Transaction): boolean {
		const category = Rail.Address.Card.Counterpart.type.is(transaction.counterpart)
			? transaction.counterpart.merchant.category
			: undefined
		return (
			!!category && stackMatch(policy.stacks, transaction.state?.card?.preset) && Group.within(policy.group, category)
		)
	}
	function find(policies: MCCPolicy[], transaction: Transaction): MCCPolicy[] | undefined {
		const result = policies.filter(c => MCCPolicy.match(c, transaction))
		return result.length > 0 ? result : undefined
	}
	export function resolve(policies: MCCPolicy[], transaction: Transaction): MCCPolicy[] {
		const blocks = policies.filter(c => c.action == "block")
		const allows = policies.filter(c => c.action == "allow")
		return find(blocks, transaction) ?? find(allows, transaction) ?? []
	}
	export function evaluate(policies: MCCPolicy[], transaction: Transaction): boolean | undefined {
		const [result] = resolve(policies, transaction)
		return result ? result.action == "allow" : undefined
	}
}
