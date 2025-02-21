import { isoly } from "isoly"
import { isly } from "isly"
import { typedly } from "typedly"
import { Identifier } from "../../Settlement/Identifier"
import { Totals } from "../../Settlement/Totals"
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
	export function create(resource: Identifier, totals: Totals): NegativeAmount[] {
		const warnings: NegativeAmount[] = []
		typedly.Object.entries(totals).forEach(
			([currency, total]) =>
				total &&
				(total.outcome?.net ?? 0) < 0 &&
				warnings.push({
					type: "negative-amount",
					resource,
					value: total.outcome!.net,
					currency,
					date: isoly.Date.now(),
				})
		)
		return warnings
	}
}
