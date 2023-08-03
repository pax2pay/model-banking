import type { Card as ModelCard } from "../../Card"

export type Card = ModelCard

export namespace Card {
	export function from(card: ModelCard): Card {
		return card
	}
}
