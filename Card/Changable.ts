import * as isoly from "isoly"
import { isly } from "isly"
import { Meta } from "./Meta"

export type Changable = {
	limit?: [isoly.Currency, number]
	rules?: string[]
	meta?: Meta
}

export namespace Changable {
	export const type = isly.object({
		limit: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()).optional(),
		rules: isly.string().array().optional(),
		meta: isly.fromIs("Card.Meta", Meta.is).optional(),
	})
}
