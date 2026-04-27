import { isoly } from "isoly"
import { isly } from "isly"
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
}
