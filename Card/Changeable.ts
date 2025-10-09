import { isoly } from "isoly"
import { isoly as isoly2 } from "isoly2"
import { isly } from "isly"
import { isly as isly2 } from "isly2"
import { Amount } from "../Amount"
import { Meta } from "./Meta"

export type Changeable = {
	limit?: Amount
	meta?: Meta
}

export namespace Changeable {
	export const type = isly.object<Changeable>({
		limit: isly.tuple(isly.fromIs("isoly.Currency", isoly.Currency.is), isly.number()).optional(),
		meta: isly.fromIs("Card.Meta", Meta.is).optional(),
	})
	export const type2: isly2.Type<Changeable> = isly2
		.object<Changeable>({
			limit: isly2
				.tuple(isoly2.Currency.type, isly2.number())
				.optional()
				.rename("Limit")
				.describe("The new limit of the card."),
			meta: isly2.from("Card.Meta", Meta.is).optional().rename("Meta").describe("The new meta data of the card."),
		})
		.rename("Changeable")
		.describe("Changeable card properties.")
}
