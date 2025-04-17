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
	) => ({
		entityType: "rule",
		entity: value.code,
		...data,
		action,
		created: isoly.DateTime.now(),
		meta: `${value.category}.${value.type}.${value.action}`,
		value,
	})
	export const addSender = Base.pipeToSender(create)
}
