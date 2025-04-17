import { isoly } from "isoly"
import { Card as modelCard } from "../Card"
import { Realm } from "../Realm"
import { Base } from "./Base"

export interface Card extends Base<modelCard> {
	realm: Realm
	entityType: "card"
	entity: string
	organization: string
	account: string
}
export namespace Card {
	export const create: Base.Create<modelCard, Card> = (value: modelCard, action: Base.Action) => ({
		realm: value.realm,
		entityType: "card",
		entity: value.id,
		organization: value.organization,
		account: value.account,
		action,
		created: isoly.DateTime.now(),
		value,
	})
	export const addSender = Base.pipeToSender(create)
}
