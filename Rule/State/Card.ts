import { isoly } from "isoly"
import { isly } from "isly"
import { Card as ModelCard } from "../../Card"
import { Realm } from "../../Realm"

export interface Card extends Omit<ModelCard, "limit">, Card.Statistics {
	age: { days: number; minutes: number }
	limit: number
	original: { currency: isoly.Currency; limit: number }
}

export namespace Card {
	export type Statistics = {
		used: { count: number; amount: number }
		reject: { count: number }
	}
	const initialStatistics = {
		used: { count: 0, amount: 0 },
		reject: { count: 0 },
	}
	function ageFromTime(time: isoly.DateTime): Card["age"] {
		const minutes = ~~(Date.now() - (isoly.DateTime.epoch(time, "milliseconds") / 1000) * 60)
		return { days: ~~(minutes / (60 * 24)), minutes }
	}
	export function from(card: ModelCard, statistics: Statistics = initialStatistics): Card {
		return {
			...statistics,
			...card,
			age: ageFromTime(card.created),
			limit: card.limit[1], // TODO add currency conversion
			original: { currency: card.limit[0], limit: card.limit[1] },
		}
	}
	// isly.object().omit(): coming soon!!
	export const type = isly.object<Card>({
		id: isly.string(),
		number: isly.string().optional(),
		created: isly.string(),
		organization: isly.string(),
		realm: Realm.type,
		account: isly.string(),
		preset: ModelCard.Preset.type,
		scheme: ModelCard.Scheme.type,
		reference: isly.string().optional(),
		details: isly.object({
			iin: isly.string(),
			last4: isly.string(),
			expiry: ModelCard.Expiry.type,
			holder: isly.string(),
			token: isly.string(),
		}),
		limit: isly.number(),
		spent: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()),
		status: isly.union(isly.string("active"), isly.string("cancelled")),
		history: isly.array(ModelCard.Operation.type),
		rules: isly.any().array(), // avoid circular dependency until we get isly.object().omit()
		meta: isly.fromIs("ModelCard.Meta", ModelCard.Meta.is).optional(),
		used: isly.object<Card["used"]>({ amount: isly.number(), count: isly.number() }),
		reject: isly.object<Card["reject"]>({ count: isly.number() }),
		age: isly.object<Card["age"]>({ days: isly.number(), minutes: isly.number() }),
		original: isly.object<Card["original"]>({
			currency: isly.string(isoly.Currency.types),
			limit: isly.number(),
		}),
	})
	export const is = type.is
	export const flaw = type.flaw
}
