import { isoly } from "isoly"
import { Rule as modelRule } from "../Rule"
import { Base } from "./Base"

export interface Rule extends Base<modelRule> {
	entityType: "rule"
	entity: string
	meta: string
}
export namespace Rule {
	export const create: Base.Create<modelRule, Rule, { organization?: string; account?: string }> = (
		value: modelRule,
		action: Base.Action,
		data?: { organization?: string; account?: string }
	) => {
		// Rule is currently typed as `never`, so its fields are read via a cast until rules are retyped.
		const rule = value as { code: string; category: string; type: string; action: string }
		return {
			entityType: "rule",
			entity: rule.code,
			...data,
			action,
			created: isoly.DateTime.now(),
			meta: `${rule.category}.${rule.type}.${rule.action}`,
			value,
		}
	}
	export const addSender = Base.pipeToSender(create)
}
