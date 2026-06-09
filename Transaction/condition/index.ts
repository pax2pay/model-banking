import { Transaction } from "../index"
import { MCC as ConditionMCC } from "./MCC"

export type Condition = ConditionMCC

export namespace Condition {
	export import MCC = ConditionMCC
	function find(conditions: Condition[], transaction: Transaction): Condition[] | undefined {
		const result = conditions.filter(c => MCC.match(c, transaction))
		return result.length > 0 ? result : undefined
	}
	export function resolve(conditions: Condition[], transaction: Transaction): Condition[] {
		const blocks = conditions.filter(c => c.policy == "block")
		const allows = conditions.filter(c => c.policy == "allow")
		return find(blocks, transaction) ?? find(allows, transaction) ?? []
	}
	export function evaluate(conditions: Condition[], transaction: Transaction): boolean | undefined {
		const [result] = resolve(conditions, transaction)
		return result ? result.policy == "allow" : undefined
	}
}
