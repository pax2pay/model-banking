import { isoly } from "isoly"
import { isly } from "isly"
import { Identifier } from "../../Settlement/Identifier"
import { Base } from "../Base"

export interface NegativeAmount extends Base {
	type: "negative-amount"
	resource: Identifier
	value: number
	currency: isoly.Currency
}

export namespace NegativeAmount {
	export const type = Base.type.extend<NegativeAmount>({
		type: isly.string("negative-amount"),
		resource: Identifier.type,
		value: isly.number(),
		currency: isly.fromIs("currency", isoly.Currency.is),
	})
	export function create(resource: Identifier, value: number, currency: isoly.Currency): NegativeAmount {
		return {
			type: "negative-amount",
			resource,
			value,
			currency,
			date: isoly.Date.now(),
		}
	}
}
