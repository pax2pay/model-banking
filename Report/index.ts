import { Cell as ReportCell } from "./Cell"
import { Delimiter } from "./Delimiter"
import { Row as ReportRow } from "./Row"

export namespace Report {
	export function toCsv(
		header: string[],
		rows: (number | string | undefined | null)[],
		delimiter: Delimiter,
		prefix?: number | string | null
	): string {
		return [Row.toCsv(header, delimiter), ...(prefix ? rows.map(r => Cell.toCsv(prefix) + delimiter + r) : rows)].join(
			"\n"
		)
	}
	export namespace Cell {
		export const toCsv = ReportCell.toCsv
	}
	export namespace Row {
		export const toCsv = ReportRow.toCsv
	}
}
