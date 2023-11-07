import { isoly } from "isoly"
import { isly } from "isly"
import { Card as ModelCard } from "../../Card"

export interface Card extends Omit<ModelCard, "limit"> {
	used: { count: number; amount: number }
	reject: { count: number }
	age: { days: number; minutes: number }
	limit: number
	original: { currency: isoly.Currency; limit: number }
}

export namespace Card {
	export function from(card: ModelCard): Card {
		return {
			...card,
			used: { count: 0, amount: 0 },
			reject: { count: 0 },
			age: { days: 0, minutes: 0 },
			limit: 0,
			original: { currency: card.limit[0], limit: card.limit[1] },
		}
	}
	// isly.object().omit(): coming soon!!
	export const type = isly.object<Card>({ ...(ModelCard.type as any), limit: isly.number() })
	export const is = type.is
	export const flaw = type.flaw
}
