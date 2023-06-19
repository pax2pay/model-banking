import { isly } from "isly"
import { Authorization } from "./Authorization"
import { Card } from "./Card"
import { Settlement } from "./Settlement"

export type Operation = Card | Authorization | Settlement

export namespace Operation {
	export const type = isly.union(Card.type, Authorization.type, Settlement.type)
	export const is = type.is
}
