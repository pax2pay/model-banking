import { Cell } from "./Cell"
import { Delimiter } from "./Delimiter"
export namespace Row {
	export function toCsv(
		values: (number | string | undefined | null)[],
		delimiter: Delimiter,
		prefix?: number | string | null
	): string {
		return [...(prefix ? [prefix] : []), ...values].map(v => Cell.toCsv(v)).join(delimiter)
	}
}
