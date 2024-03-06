import { isoly } from "isoly"
import { isly } from "isly"
import { Total } from "./Total"

export type Totals = Partial<Record<isoly.Currency, Total>>
export namespace Totals {
	export const type = isly.record<isoly.Currency, Total>(isly.string(isoly.Currency.types), Total.type)
}
