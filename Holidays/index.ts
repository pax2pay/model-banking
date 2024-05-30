import { isoly } from "isoly"
import { isly } from "isly"
import { Dates } from "./Dates"

export namespace Holidays {
	export type Regions = typeof Regions.values[number]
	export namespace Regions {
		export const values = ["England", "Wales", "Scotland", "Northern Ireland"] as const
		export const type = isly.string<Regions>(values)
	}
	export const dates: Record<Regions, Readonly<isoly.Date>[]> = {
		England: Dates.englandAndWales,
		Wales: Dates.englandAndWales,
		Scotland: Dates.scotland,
		"Northern Ireland": Dates.northernIreland,
	}
}
