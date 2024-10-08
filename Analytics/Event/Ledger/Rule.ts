import { isoly } from "isoly"
import { Realm } from "../../../Realm"
import { Rule as modelRule } from "../../../Rule"
import { Base } from "./Base"

export interface Rule extends Base<modelRule> {
	entity: { type: "rule"; id: string }
	action: "created" | "updated" | "removed"
	meta: {
		ruleType: modelRule.Kind
		ruleCategory: modelRule.Category
		ruleAction: modelRule.Action
	}
}
export namespace Rule {
	export function create(
		value: modelRule,
		realm: Realm,
		action: Rule["action"],
		organization?: string,
		account?: string
	): Rule {
		return {
			realm,
			entity: { type: "rule", id: value.code },
			organization,
			account,
			action,
			created: isoly.DateTime.now(),
			meta: {
				ruleType: value.type,
				ruleCategory: value.category,
				ruleAction: value.action,
			},
			value,
		}
	}
}
