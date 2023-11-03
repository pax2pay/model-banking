import { Card as ModelCard } from "../../Card"

export interface Card extends Omit<ModelCard, "limit"> {
	used: { count: number; amount: number }
	reject: { count: number }
	age: { minutes: number }
	limit: number
}

export namespace Card {
	export function from(card: ModelCard): Card {
		return card
	}
	export const type = ModelCard.type
	export const is = type.is
	export const flaw = type.flaw
}
