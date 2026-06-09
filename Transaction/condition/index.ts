import { Transaction } from "../index"
import { MCC } from "./MCC"

export type Condition = MCC

export namespace Condition {
	function match(condition: Condition, transaction: Transaction): boolean {
		if (MCC.type.is(condition)) {
			return MCC.match(condition, transaction)
		}
		return false
	}

	function find(conditions: Condition[], transaction: Transaction): Condition[] | undefined {
		const result = conditions.filter(c => match(c, transaction))
		return result.length > 0 ? result : undefined
	}

	export function resolve(conditions: Condition[], transaction: Transaction): Condition[] {
		const blocks = conditions.filter(c => c.policy == "block")
		const allows = conditions.filter(c => c.policy == "allow")
		return find(blocks, transaction) ?? find(allows, transaction) ?? []
	}

	export function evaluate(conditions: Condition[], transaction: Transaction): boolean | undefined {
		const [result] = resolve(conditions, transaction)
		return result == undefined ? undefined : result.policy == "allow"
	}
}
