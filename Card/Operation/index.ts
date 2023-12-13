import { isly } from "isly"
import { Authorization } from "./Authorization"
import { Card } from "./Card"

export type Operation = Card | Authorization

export namespace Operation {
	export const type = isly.union(Card.type, Authorization.type)
	export const is = type.is
}
