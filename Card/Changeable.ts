import { isoly } from "isoly"
import { isly } from "isly"
import { Meta } from "./Meta"

export type Changeable = {
	limit?: [isoly.Currency, number]
	rules?: string[]
	meta?: Meta
}

export namespace Changeable {
	export const type = isly.object({
		limit: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()).optional(),
		rules: isly.string().array().optional(),
		meta: isly.fromIs("Card.Meta", Meta.is).optional(),
	})
}