import { isoly } from "isoly"
import { Realm } from "../../Realm"
import { Rule as modelRule } from "../../Rule"
import { Base } from "./Base"

export type Rule = Base<modelRule> & {
	entity: { type: "rule"; id: string }
	action: "created" | "updated" | "removed"
}
export namespace Rule {
	export function create(value: modelRule, realm: Realm, action: Rule["action"]): Rule {
		return {
			realm,
			entity: { type: "rule", id: value.code },
			action,
			created: isoly.DateTime.now(),
			value,
		}
	}
}
