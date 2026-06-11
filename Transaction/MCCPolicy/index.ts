import { isly } from "isly"
import { Card } from "../../Card"
import { Merchant } from "../../Merchant"
import { Action as MCCAction } from "./Action"
import { Group as MCCGroup } from "./Group"

export interface MCCPolicy {
	id: string
	action: MCCPolicy.Action
	name: string
	description?: string
	stacks?: Card.Stack[]
	organizations?: string[]
	group: MCCPolicy.Group
}
export namespace MCCPolicy {
	export import Action = MCCAction
	export import Group = MCCGroup
	export type TransactionInput = { category?: Merchant.Category; cardPreset?: Card.Preset; org?: string }
	export const type = isly.object<MCCPolicy>({
		id: isly.string(),
		action: Action.type,
		name: isly.string(),
		description: isly.string().optional(),
		organizations: isly.string().array().optional(),
		stacks: Card.Stack.type.array().optional(),
		group: Group.type,
	})
	export function match(policy: MCCPolicy, transaction: TransactionInput): boolean {
		const stack = transaction.cardPreset ? Card.Preset.presets[transaction.cardPreset] : undefined
		const stackMatches = !policy.stacks || (!!stack && policy.stacks.includes(stack))
		const orgMatches = !policy.organizations || (!!transaction.org && policy.organizations.includes(transaction.org))
		return !!transaction.category && stackMatches && orgMatches && Group.within(policy.group, transaction.category)
	}
	export function resolve(policies: MCCPolicy[], transaction: TransactionInput): MCCPolicy[] {
		const blocks = policies.filter(c => c.action == "block")
		const blockMatches = blocks.filter(c => MCCPolicy.match(c, transaction))
		const allows = policies.filter(c => c.action == "allow")
		return blockMatches.length ? blockMatches : allows.filter(c => MCCPolicy.match(c, transaction))
	}
	export function isAllowed(policies: MCCPolicy[], transaction: TransactionInput): boolean | undefined {
		const [result] = resolve(policies, transaction)
		return result ? result.action == "allow" : undefined
	}
}
