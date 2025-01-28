import { isoly } from "isoly"
import { Card as modelCard } from "../../../Card"
import { Base } from "./Base"

export interface Card extends Base<modelCard> {
	entity: { type: "card"; id: string }
	action: "created" | "updated" | "cancelled"
}
export namespace Card {
	export function create(value: modelCard, action: Card["action"]): Card {
		return {
			realm: value.realm,
			entity: { type: "card", id: value.id },
			organization: value.organization,
			account: value.account,
			action,
			created: isoly.DateTime.now(),
			value,
		}
	}
}
