import { isoly } from "isoly"
import { isly } from "isly"
import { Card as ModelCard } from "../../Card"

export interface Card extends Omit<ModelCard, "limit">, Card.Statistics {
	age: { days: number; minutes: number }
	limit: number
	original: { currency: isoly.Currency; limit: number }
	used: { merchants: string[] }
}

export namespace Card {
	export type Statistics = {
		used: { count: number; amount: number }
		reject: { count: number }
	}
	export const initialStatistics = {
		used: { count: 0, amount: 0 },
		reject: { count: 0 },
	}
	function ageFromTime(time: isoly.DateTime): Card["age"] {
		const minutes = ~~(Date.now() - (isoly.DateTime.epoch(time, "milliseconds") / 1000) * 60)
		return { days: ~~(minutes / (60 * 24)), minutes }
	}
	export function from(card: ModelCard, statistics: Statistics = initialStatistics): Card {
		return {
			...card,
			...statistics,
			age: ageFromTime(card.created),
			limit: card.limit[1], // TODO add currency conversion
			original: { currency: card.limit[0], limit: card.limit[1] },
		}
	}
	export const type = ModelCard.type.omit(["limit"]).extend<Card>({
		age: isly.object<Card["age"]>({ days: isly.number(), minutes: isly.number() }),
		limit: isly.number(),
		original: isly.object<Card["original"]>({
			currency: isly.string(isoly.Currency.types),
			limit: isly.number(),
		}),
		used: isly.object<Card["used"]>({ amount: isly.number(), count: isly.number() }),
		reject: isly.object<Card["reject"]>({ count: isly.number() }),
	})
	export const is = type.is
	export const flaw = type.flaw
}
