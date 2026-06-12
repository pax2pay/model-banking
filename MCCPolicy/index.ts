import { isoly } from "isoly"
import { isly } from "isly"
import { Card } from "../Card"
import { Merchant } from "../Merchant"
import { Realm } from "../Realm"
import { Action as MCCAction } from "./Action"
import { Creatable as MCCPolicyCreatable } from "./Creatable"
import { Group as MCCGroup } from "./Group"
import { Updatable as MCCPolicyUpdatable } from "./Updatable"

export interface MCCPolicy extends MCCPolicyCreatable {
	id: string
	realm: Realm
	created: isoly.DateTime
	updated: isoly.DateTime
}
export namespace MCCPolicy {
	export import Creatable = MCCPolicyCreatable
	export import Updatable = MCCPolicyUpdatable
	export import Action = MCCAction
	export import Group = MCCGroup
	export type TransactionInput = { category?: Merchant.Category; cardPreset?: Card.Preset; org?: string }
	export const type = Creatable.type.extend<MCCPolicy>({
		id: isly.string(),
		realm: Realm.type,
		created: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
		updated: isly.fromIs("isoly.DateTime", isoly.DateTime.is),
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
