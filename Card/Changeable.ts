import { isoly } from "isoly"
import { isoly as isoly } from "isoly"
import { isly } from "isly"
import { isly as isly } from "isly"
import { Amount } from "../Amount"
import { Meta } from "./Meta"

export type Changeable = {
	limit?: Amount
	meta?: Meta
}

export namespace Changeable {
	export const type = isly.object<Changeable>({
		limit: isly.tuple(isoly.Currency.type), isly.number()).optional(),
		meta: isly.fromIs("Card.Meta", Meta.is).optional(),
	})
	export const type: isly.Object<Changeable> = isly
		.object<Changeable>({
			limit: isly
				.tuple(isoly.Currency.type, isly.number())
				.optional()
				.rename("Limit")
				.describe("The new limit of the card."),
			meta: isly.from("Card.Meta", Meta.is).optional().rename("Meta").describe("The new meta data of the card."),
		})
		.rename("Changeable")
		.describe("Changeable card properties.")
}
