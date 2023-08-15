import { isly } from "isly"
import { Authorization } from "./Authorization"
import { Card } from "./Card"

export interface Partial {
	authorization: Authorization
	card: Card
}

export namespace Partial {
	export const type = isly.object<Partial>({ card: Card.type, authorization: Authorization.type })
	export const is = type.is
	export const flaw = type.flaw
}
