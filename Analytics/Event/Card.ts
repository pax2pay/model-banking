import { isoly } from "isoly"
import { Card as modelCard } from "../../Card"
import { Realm } from "../../Realm"
import { Base } from "./Base"

export type Card = Base<modelCard> & {
	entity: { type: "card"; id: string }
	action: "created" | "updated" | "removed"
}
export namespace Card {
	export function create(value: modelCard, realm: Realm, action: Card["action"]): Card {
		return {
			realm,
			entity: { type: "card", id: value.id },
			action,
			created: isoly.DateTime.now(),
			value,
		}
	}
}
