import { isly } from "isly"
import { Card } from "../../Card"
import { Rail } from "../../Rail"
import type { Transaction } from "../index"
import { Action as MCCAction } from "./Action"
import { Group as MCCGroup } from "./Group"

export interface MCCPolicy {
	id: string
	action: MCCPolicy.Action
	description: string
	stacks?: Card.Stack[]
	organizations?: string[]
	group: MCCPolicy.Group
}
export namespace MCCPolicy {
	export import Action = MCCAction
	export import Group = MCCGroup
	export type TransactionInput = { category?: string; cardPreset?: Card.Preset; org?: string }
	export const type = isly.object<MCCPolicy>({
		id: isly.string(),
		action: Action.type,
		description: isly.string(),
		organizations: isly.string().array().optional(),
		stacks: Card.Stack.type.array().optional(),
		group: Group.type,
	})
	function matchStack(allowedStacks: Card.Stack[] | undefined, preset: Card.Preset | undefined): boolean {
		const stack = preset ? Card.Preset.presets[preset] : undefined
		return !allowedStacks || (!!stack && allowedStacks.includes(stack))
	}
	function matchOrg(allowedOrgs: string[] | undefined, org: string | undefined): boolean {
		return !allowedOrgs || (!!org && allowedOrgs.includes(org))
	}
	export function match(policy: MCCPolicy, transaction: MCCPolicy.TransactionInput): boolean {
		return (
			!!transaction.category &&
			matchStack(policy.stacks, transaction.cardPreset) &&
			matchOrg(policy.organizations, transaction.org) &&
			Group.within(policy.group, transaction.category)
		)
	}
	export function getMatching(policies: MCCPolicy[], transaction: MCCPolicy.TransactionInput): MCCPolicy[] | undefined {
		const result = policies.filter(c => MCCPolicy.match(c, transaction))
		return result.length > 0 ? result : undefined
	}
	export function resolve(
		policies: MCCPolicy[],
		transaction: { category?: string; cardPreset?: Card.Preset; org?: string }
	): MCCPolicy[] {
		const blocks = policies.filter(c => c.action == "block")
		const allows = policies.filter(c => c.action == "allow")
		return getMatching(blocks, transaction) ?? getMatching(allows, transaction) ?? []
	}
	export function isAllowed(
		policies: MCCPolicy[],
		transaction: { category?: string; cardPreset?: Card.Preset; org?: string }
	): boolean | undefined {
		const [result] = resolve(policies, transaction)
		return result ? result.action == "allow" : undefined
	}
	export function toTransactionInput(transaction: Transaction): MCCPolicy.TransactionInput {
		return {
			category: Rail.Address.Card.Counterpart.type.is(transaction.counterpart)
				? transaction.counterpart.merchant.category
				: undefined,
			cardPreset: transaction.state?.card?.preset,
			org: transaction.organization,
		}
	}
}
