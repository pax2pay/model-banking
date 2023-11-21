import { isly } from "isly"

type numeric = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
type yearDay = Exclude<
	`${"0" | "1" | "2"}${numeric}${numeric}` | `3${"0" | "1" | "2" | "3" | "4" | "5" | "6"}${numeric}`,
	"000" | "367" | "368" | "369"
>
export type SettlementEntry = `${"settlement" | "fee"}-mc-tpl-${yearDay}0${"1" | "2" | "3" | "4" | "5" | "6"}`

export namespace SettlementEntry {
	export const type = isly.string(/^(?:settlement|fee)-mc-tpl-\d{5}$/)
	export const is = type.is
}
