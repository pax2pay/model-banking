import { isoly } from "isoly"
import { isly } from "isly"
import { Card as ModelCard } from "../../Card"
import type { Rail } from "../../Rail"
import type { Status as TransactionStatus } from "../../Transaction/Status"

export interface Card extends Omit<ModelCard, "limit">, Card.Statistics {
	age: { days: number; minutes: number }
	limit: number
	original: { currency: isoly.Currency; limit: number }
}

export namespace Card {
	export type Statistics = {
		used: { count: number; amount: number; merchants: string[] }
		reject: { count: number }
	}
	export const initialStatistics: Statistics = {
		used: { count: 0, amount: 0, merchants: [] },
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
	export function check(card: Card, amount: number): TransactionStatus.Reason | undefined {
		let result: TransactionStatus.Reason | undefined = undefined
		if (ModelCard.Expiry.isExpired(card.details.expiry))
			result = "card expired"
		else if (amount + card.spent[1] > card.limit)
			result = "exceeds limit"
		return result
	}
	export function toAddress(card: Card): Rail.Address.Card {
		return {
			type: "card",
			id: card.id,
			expiry: card.details.expiry,
			holder: card.details.holder,
			iin: card.details.iin,
			last4: card.details.last4,
			scheme: card.scheme,
		}
	}
	export const type = ModelCard.type.omit(["limit"]).extend<Card>({
		age: isly.object<Card["age"]>({ days: isly.number(), minutes: isly.number() }),
		limit: isly.number(),
		original: isly.object<Card["original"]>({
			currency: isly.string(isoly.Currency.types),
			limit: isly.number(),
		}),
		used: isly.object<Card["used"]>({ amount: isly.number(), count: isly.number(), merchants: isly.string().array() }),
		reject: isly.object<Card["reject"]>({ count: isly.number() }),
	})
	export const is = type.is
	export const flaw = type.flaw
}
