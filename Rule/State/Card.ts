import { Card as ModelCard } from "../../Card"

export type Card = ModelCard

export namespace Card {
	export function from(card: ModelCard): Card {
		return card
	}
	export const type = ModelCard.type
	export const is = type.is
	export const flaw = type.flaw
}
