import { isly } from "isly"

type numeric = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
type yearDay = Exclude<
	`${"0" | "1" | "2"}${numeric}${numeric}` | `3${"0" | "1" | "2" | "3" | "4" | "5" | "6"}${numeric}`,
	"000" | "367" | "368" | "369"
>
export type Batch = `${yearDay}0${"1" | "2" | "3" | "4" | "5" | "6"}`

export namespace Batch {
	export const type = isly.string(/^(?:[0-2]\d\d|3[0-6]\d)0[1-6]$/)
}
